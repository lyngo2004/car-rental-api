import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    create(createCarDto: CreateCarDto): Promise<import("./entity/car.entity").TCar>;
    findAll(query: QueryCarDto): Promise<import("../../common/types/pagination.type").TPaginationResult<import("./entity/car.entity").TCar>>;
    findOne(id: string): Promise<import("./entity/car.entity").TCar | null>;
    update(id: string, updateCarDto: UpdateCarDto): Promise<import("./entity/car.entity").TCar>;
    remove(id: string): Promise<import("./entity/car.entity").TCar>;
}
