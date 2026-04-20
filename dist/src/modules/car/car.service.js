"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const car_entity_1 = require("./entity/car.entity");
let CarService = class CarService {
    carRepository;
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    create(createCarDto) {
        const car = {
            brand: createCarDto.brand.trim(),
            model: createCarDto.model.trim(),
            carType: createCarDto.carType.trim(),
            color: createCarDto.color.trim(),
            licensePlate: createCarDto.licensePlate.trim(),
            manufactureYear: createCarDto.manufactureYear,
            pricePerDay: createCarDto.pricePerDay,
            capacity: createCarDto.capacity,
            mileage: createCarDto.mileage,
            status: createCarDto.status ?? 'AVAILABLE',
            description: createCarDto.description ?? null,
            imagePath: createCarDto.imagePath ?? null,
            publicImageId: createCarDto.publicImageId ?? null,
        };
        return this.carRepository.create(car);
    }
    findAll(query) {
        return this.carRepository.findAll(query);
    }
    findOne(id) {
        const car = this.carRepository.findById(id);
        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    }
    update(id, updateCarDto) {
        const updatedCar = {
            ...updateCarDto,
            brand: updateCarDto.brand?.trim(),
            model: updateCarDto.model?.trim(),
            carType: updateCarDto.carType?.trim(),
            color: updateCarDto.color?.trim(),
            licensePlate: updateCarDto.licensePlate?.trim(),
        };
        return this.carRepository.update(id, updatedCar);
    }
    remove(id) {
        const car = this.findOne(id);
        if (!car) {
            throw new Error('Car not found');
        }
        const status = car_entity_1.CarStatus.DELETED;
        return this.carRepository.update(id, { status });
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CAR_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], CarService);
//# sourceMappingURL=car.service.js.map