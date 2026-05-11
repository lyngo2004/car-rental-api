import { IsEmail } from "class-validator";
import { CreateRentalDto } from "./create-rental.dto";

export class EmployeeCreateRentalDto extends CreateRentalDto {
    @IsEmail()
    customerEmail: string;
}