import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { RENTAL_REPOSITORY } from "../repository/rental.token";
import type { IRentalRepository, TCreateRental, TQueryRental, TUpdateRental } from "../repository/rental.repository";
import { RentalResponseDto } from "../dto/rental-response.dto";
import { CreateRentalDto } from "../dto/create-rental.dto";
import { CUSTOMER_REPOSITORY } from "../../customer/repository/customer.token";
import type { ICustomerRepository } from "../../customer/repository/customer.repository";
import { CAR_REPOSITORY } from "../../car/repository/car.token";
import type { ICarRepository } from "../../car/repository/car.repository";
import { RentalStatus, TRental } from "../entity/rental.entity";
import { EmployeeCreateRentalDto } from "../dto/employee-create-rental.dto";
import { EMPLOYEE_REPOSITORY } from "../../employee/repository/employee.token";
import type { IEmployeeRepository } from "../../employee/repository/employee.repository";
import { UpdateRentalDto } from "../dto/update-rental.dto";
import { TPaginationResult } from "src/common/types/pagination.type";
import { USER_REPOSITORY } from "../../users/repository/user.token";
import type { IUserRepository } from "../../users/repository/user.repository";
import { CarStatus, TCar } from "../../car/entity/car.entity";
import { RentalAvailabilityService } from "./rental-availability.service";

@Injectable()
export class RentalService {
    private readonly minRentalDurationMs = 2 * 60 * 60 * 1000;

    constructor(
        @Inject(RENTAL_REPOSITORY)
        private rentalRepository: IRentalRepository,
        @Inject(CUSTOMER_REPOSITORY)
        private customerRepository: ICustomerRepository,
        @Inject(CAR_REPOSITORY)
        private carRepository: ICarRepository,
        @Inject(EMPLOYEE_REPOSITORY)
        private employeeRepository: IEmployeeRepository,
        @Inject(USER_REPOSITORY)
        private userRepository: IUserRepository,
        private rentalAvai: RentalAvailabilityService
    ) { }

    private calculateTotalAmount(car: TCar, pickUpAt: Date, dropOffAt: Date): number {
        return car.pricePerHour * Math.ceil((dropOffAt.getTime() - pickUpAt.getTime()) / (1000 * 60 * 60));
    }

    private validateRentalWindow(pickUpAt: Date, dropOffAt: Date): void {
        if (Number.isNaN(pickUpAt.getTime()) || Number.isNaN(dropOffAt.getTime())) {
            throw new BadRequestException('Invalid rental time');
        }

        if (pickUpAt >= dropOffAt) {
            throw new BadRequestException('Pick-up date must be before drop-off date');
        }

        if (dropOffAt.getTime() - pickUpAt.getTime() < this.minRentalDurationMs) {
            throw new BadRequestException('Rental duration must be at least 2 hours');
        }
    }

    private async create(data: {
        carId: string;
        customerId: string;
        employeeId: string | null;
        rentalStatus: RentalStatus;
        pickUpAt: string;
        dropOffAt: string;
        pickUpLocation: string;
        dropOffLocation: string;
    }): Promise<RentalResponseDto> {

        const car = await this.carRepository.findById(data.carId);
        if (!car) {
            throw new NotFoundException('Car not found');
        }

        const pickUpAt = new Date(data.pickUpAt);
        const dropOffAt = new Date(data.dropOffAt);
        this.validateRentalWindow(pickUpAt, dropOffAt);

        const isAvailable = await this.rentalAvai.isCarAvailable(car, pickUpAt, dropOffAt);

        if (!isAvailable) {
            throw new ConflictException('Car is not available for the selected dates');
        }

        const totalAmount = this.calculateTotalAmount(car, pickUpAt, dropOffAt);

        const rental: TCreateRental = {
            ...data,
            pickUpAt,
            dropOffAt,
            totalAmount
        };
        return this.rentalRepository.create(rental).then(RentalResponseDto.fromEntity);
    }

    async createByCustomer(userId: string, dto: CreateRentalDto): Promise<RentalResponseDto> {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer) {
            throw new Error('Customer not found');
        }

        return this.create({
            rentalStatus: RentalStatus.PENDING,
            customerId: customer.id,
            employeeId: null,
            ...dto,
        });
    }

    async createByEmployee(userId: string, dto: EmployeeCreateRentalDto): Promise<RentalResponseDto> {
        const employee = await this.employeeRepository.findByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }

        const customer = await (this.userRepository.findByEmail(dto.customerEmail)).then((user) => {
            if (!user) {
                throw new Error('Customer user not found');
            }
            return this.customerRepository.findByUserId(user.id);
        });
        if (!customer) {
            throw new Error('Customer not found');
        }

        return this.create({
            rentalStatus: RentalStatus.PENDING,
            customerId: customer.id,
            employeeId: employee.id,
            ...dto,
        });
    }

    async findAllByCustomer(userId: string, query: TQueryRental = {}): Promise<TPaginationResult<RentalResponseDto>> {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return this.rentalRepository.findAllByCustomerId(customer.id, query).then((result) => ({
            ...result,
            data: result.data.map(RentalResponseDto.fromEntity)
        }));
    }

    async findAll(query: TQueryRental = {}): Promise<TPaginationResult<RentalResponseDto>> {
        return this.rentalRepository.findAll(query).then((result) => ({
            ...result,
            data: result.data.map(RentalResponseDto.fromEntity)
        }));
    }

    async findByIdForCustomer(rentalId: string, userId: string): Promise<RentalResponseDto> {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer) {
            throw new UnauthorizedException('Customer not found');
        }

        const rental = await this.rentalRepository.findByCustomerAndId(customer.id, rentalId);
        if (!rental) {
            throw new NotFoundException('Rental not found');
        }

        return RentalResponseDto.fromEntity(rental);
    }

    async findById(rentalId: string): Promise<RentalResponseDto> {
        const rental = await this.rentalRepository.findById(rentalId);
        if (!rental) {
            throw new NotFoundException('Rental not found');
        }

        return RentalResponseDto.fromEntity(rental);
    }

    private toUpdateRental(data: UpdateRentalDto): Partial<TUpdateRental> {
        const { pickUpAt, dropOffAt, carId, pickUpLocation, dropOffLocation } = { ...data };

        const updateData: Partial<TUpdateRental> = {};

        if (carId !== undefined) {
            updateData.carId = carId;
        }

        if (pickUpAt !== undefined) {
            updateData.pickUpAt = new Date(pickUpAt);
        }

        if (dropOffAt !== undefined) {
            updateData.dropOffAt = new Date(dropOffAt);
        }

        if (pickUpLocation !== undefined) {
            updateData.pickUpLocation = pickUpLocation;
        }

        if (dropOffLocation !== undefined) {
            updateData.dropOffLocation = dropOffLocation;
        }

        return updateData;
    }

    private async buildUpdateData(rental: TRental, dto: UpdateRentalDto): Promise<Partial<TUpdateRental>> {
        const updateData = this.toUpdateRental(dto);

        const nextCarId = updateData.carId ?? rental.carId;
        const nextPickUpAt = updateData.pickUpAt ?? rental.pickUpAt;
        const nextDropOffAt = updateData.dropOffAt ?? rental.dropOffAt;

        this.validateRentalWindow(nextPickUpAt, nextDropOffAt);

        const shouldCheckAvailability =
            nextCarId !== rental.carId ||
            nextPickUpAt.getTime() !== rental.pickUpAt.getTime() ||
            nextDropOffAt.getTime() !== rental.dropOffAt.getTime();

        if (!shouldCheckAvailability) {
            return updateData;
        }

        const car = await this.carRepository.findById(nextCarId);
        if (!car) {
            throw new NotFoundException('Car not found');
        }

        const isAvailable = await this.rentalAvai.isCarAvailable(car, nextPickUpAt, nextDropOffAt, rental.id);
        if (!isAvailable) {
            throw new ConflictException('Car is not available for the selected dates');
        }

        return {
            ...updateData,
            totalAmount: this.calculateTotalAmount(car, nextPickUpAt, nextDropOffAt),
        };
    }

    async updateByCustomer(rentalId: string, userId: string, dto: UpdateRentalDto): Promise<RentalResponseDto> {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer) {
            throw new UnauthorizedException('Customer not found');
        }

        const rental = await this.rentalRepository.findById(rentalId);
        if (!rental) {
            throw new NotFoundException('Rental not found');
        }

        if (rental.customerId !== customer.id) {
            throw new ForbiddenException('Unauthorized');
        }

        if (dto.rentalStatus === RentalStatus.CANCELLED) {
            return this.toCancelRental(rental);
        }

        if (dto.rentalStatus !== undefined) {
            throw new ForbiddenException('Customers can only cancel rental status');
        }

        if (rental.rentalStatus !== RentalStatus.PENDING) {
            throw new ForbiddenException('Only rentals pending can be updated');
        }

        const updateData = await this.buildUpdateData(rental, dto);
        return this.rentalRepository.update(rentalId, updateData).then(RentalResponseDto.fromEntity);
    }

    async updateByEmployee(rentalId: string, userId: string, dto: UpdateRentalDto): Promise<RentalResponseDto> {
        const employee = await this.employeeRepository.findByUserId(userId);

        if (!employee) {
            throw new UnauthorizedException('Employee not found');
        }

        const rental = await this.rentalRepository.findById(rentalId);
        if (!rental) {
            throw new NotFoundException('Rental not found');
        }

        if (rental.employeeId && rental.employeeId !== employee.id) {
            throw new ForbiddenException('Can only update rental assigned to you');
        }

        if (dto.rentalStatus === RentalStatus.APPROVED) {
            return this.approveRental(rentalId, userId);
        }

        if (dto.rentalStatus === RentalStatus.REJECTED) {
            return this.rejectRental(rentalId, userId);
        }

        if (dto.rentalStatus === RentalStatus.CANCELLED) {
            return this.toCancelRental(rental, employee.id);
        }

        const updateData = {
            ...await this.buildUpdateData(rental, dto),
            employeeId: employee.id,

        };
        return this.rentalRepository.update(rentalId, updateData).then(RentalResponseDto.fromEntity);
    }

    async approveRental(rentalId: string, userId: string): Promise<RentalResponseDto> {
        const employee = await this.employeeRepository.findByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }

        const rental = await this.rentalRepository.findById(rentalId);
        if (!rental) {
            throw new Error('Rental not found');
        }
        if (rental.employeeId && rental.employeeId !== employee.id) {
            throw new Error('Can only update rental assigned to you');
        }
        if (rental.rentalStatus !== RentalStatus.PENDING) {
            throw new BadRequestException('Only rentals pending can be approved');
        }

        const updateData = this.rentalRepository.update(rentalId, {
            rentalStatus: RentalStatus.APPROVED,
            employeeId: employee.id,
        });
        return updateData.then(RentalResponseDto.fromEntity);
    }

    async rejectRental(rentalId: string, userId: string): Promise<RentalResponseDto> {
        const employee = await this.employeeRepository.findByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }

        const rental = await this.rentalRepository.findById(rentalId);
        if (!rental) {
            throw new NotFoundException('Rental not found');
        }

        if (rental.employeeId && rental.employeeId !== employee.id) {
            throw new ForbiddenException('Can only update rental assigned to you');
        }
        if (rental.rentalStatus !== RentalStatus.PENDING) {
            throw new BadRequestException('Only rentals pending can be rejected');
        }

        const updateData = this.rentalRepository.update(rentalId, {
            rentalStatus: RentalStatus.REJECTED,
            employeeId: employee.id,
        });
        return updateData.then(RentalResponseDto.fromEntity);
    }

    private async toCancelRental(rental: TRental, employeeId?: string): Promise<RentalResponseDto> {
        const allowedCancelStatuses = [RentalStatus.PENDING, RentalStatus.APPROVED];
        if (!allowedCancelStatuses.includes(rental.rentalStatus)) {
            throw new ForbiddenException('Only rentals pending or approved can be cancelled');
        }

        return this.rentalRepository.update(rental.id, { rentalStatus: RentalStatus.CANCELLED, employeeId }).then(RentalResponseDto.fromEntity);
    }

    async cancelRentalByCustomer(rentalId: string, userId: string): Promise<RentalResponseDto> {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer) {
            throw new Error('Customer not found');
        }
        const rental = await this.rentalRepository.findByCustomerAndId(customer.id, rentalId);
        if (!rental) {
            throw new NotFoundException('Rental not found');
        }
        return this.toCancelRental(rental);
    }

    async cancelRentalByEmployee(rentalId: string, userId: string): Promise<RentalResponseDto> {
        const employee = await this.employeeRepository.findByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }

        const rental = await this.rentalRepository.findById(rentalId);
        if (!rental) {
            throw new NotFoundException('Rental not found');
        }

        if (rental.employeeId && rental.employeeId !== employee.id) {
            throw new ForbiddenException('Can only update rental assigned to you');
        }

        return this.toCancelRental(rental, employee.id);
    }
}
