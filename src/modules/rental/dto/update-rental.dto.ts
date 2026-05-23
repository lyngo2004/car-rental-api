import { PartialType } from "@nestjs/mapped-types";
import { CreateRentalDto } from "./create-rental.dto";
import { IsEnum, IsOptional } from "class-validator";
import { RentalStatus } from "../entity/rental.entity";

export class UpdateRentalDto extends PartialType(CreateRentalDto) {
    @IsOptional()
    @IsEnum(RentalStatus)
    rentalStatus?: RentalStatus;
}
