import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { Role as RoleEnum } from 'src/modules/users/entity/user.entity';
import { RentalAvailabilityService } from '../rental/service/rental-availability.service';

@Controller('cars')
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly rentalAvailabilityService: RentalAvailabilityService
  ) { }

  @UseGuards(RoleGuard)
  @Role(RoleEnum.EMPLOYEE)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll(@Query() query: QueryCarDto) {
    return this.carService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(id);
  }

  @Get('/available')
  findAvailableCars(
    @Query('pickUpAt') pickUpAt: string,
    @Query('dropOffAt') dropOffAt: string,
  ) {
    return this.rentalAvailabilityService.findAvailableCars(new Date(pickUpAt), new Date(dropOffAt));
  }

  @UseGuards(RoleGuard)
  @Role(RoleEnum.EMPLOYEE)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto
  ) {
    return this.carService.update(id, updateCarDto);
  }

  @UseGuards(RoleGuard)
  @Role(RoleEnum.EMPLOYEE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
