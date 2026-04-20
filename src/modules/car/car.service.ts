import { Inject, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import type { ICarRepository, TCreateCar, TUpdateCar } from './repository/car.repository';
import { QueryCarDto } from './dto/query-car.dto';
import { CarStatus } from './entity/car.entity';

@Injectable()
export class CarService {
  constructor(
    @Inject('CAR_REPOSITORY')
    private carRepository: ICarRepository
  ) { }

  create(createCarDto: CreateCarDto) {
    const car: TCreateCar = {
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

  findAll(query: QueryCarDto) {
    return this.carRepository.findAll(query);
  }

  findOne(id: string) {
    const car = this.carRepository.findById(id);

    if (!car) {
      throw new Error('Car not found');
    }

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const updatedCar: TUpdateCar = {
      ...updateCarDto,
      brand: updateCarDto.brand?.trim(),
      model: updateCarDto.model?.trim(),
      carType: updateCarDto.carType?.trim(),
      color: updateCarDto.color?.trim(),
      licensePlate: updateCarDto.licensePlate?.trim(),
    };
    return this.carRepository.update(id, updatedCar);
  }

  remove(id: string) {
    const car = this.findOne(id);

    if (!car) {
      throw new Error('Car not found');
    }

    const status = CarStatus.DELETED;
    return this.carRepository.update(id, { status });
  }
}
