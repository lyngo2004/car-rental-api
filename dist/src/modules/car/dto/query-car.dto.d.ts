import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { CarStatus } from '../entity/car.entity';
export declare class QueryCarDto extends PaginationQueryDto {
    brand?: string;
    model?: string;
    carType?: string;
    color?: string;
    carStatus?: CarStatus.AVAILABLE;
    sortBy?: 'pricePerDay' | 'manufactureYear' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}
