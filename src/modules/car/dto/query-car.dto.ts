import {
  IsOptional,
  IsIn,
  IsString,
  IsEnum,
} from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { CarStatus } from '../entity/car.entity';

export class QueryCarDto extends PaginationQueryDto {
    @IsString()
    @IsOptional()
    brand?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsString()
    carType?: string

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsEnum(CarStatus)
    carStatus?: CarStatus.AVAILABLE;

    @IsIn(['pricePerHour', 'manufactureYear','createdAt'])
    @IsOptional()
    sortBy?: 'pricePerHour' | 'manufactureYear' | 'createdAt';

    @IsIn(['asc', 'desc'])
    @IsOptional()
    sortOrder?: 'asc' | 'desc';
}

