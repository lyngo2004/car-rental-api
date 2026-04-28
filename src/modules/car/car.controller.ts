import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) { }

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto
  ) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
