import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IUnitOfWork } from "../unit-of-work/unit-of-work.interface";
import { RegisterUserDto } from "./dto/register.dto";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import { RegisterUserResult } from "./dto/register-response.dto";

@Injectable()
export class AuthService {
    constructor(
        @Inject('IUnitOfWork')
        private readonly unitOfWork: IUnitOfWork,
        private readonly configService: ConfigService
    ) { }

    registerUser(dto: RegisterUserDto) : Promise<RegisterUserResult> {
        return this.unitOfWork.run(async ({ users, customers }) => {
            const existing = await users.findByEmail(dto.email);
            if (existing) {
                throw new ConflictException(`Email ${dto.email} already registered`);
            }

            const hashedPassword = await bcrypt.hash(dto.password, Number(this.configService.get('SALT_ROUNDS')));

            const user = await users.createUser({
                email: dto.email,
                passwordHash: hashedPassword,
            });

            const customer = await customers.createCustomer(
                user.id,
                {
                    fullName: dto.fullName,
                    phone: dto.phone,
                    address: dto.address,
                    driverLicense: dto.driverLicense,
                    dateOfBirth: dto.dateOfBirth,
                }
            );

            return {
                email: user.email,
                ...customer,
            }
        })
    };
}