import { Body, Get, JsonController, Post, Put, Delete, Param } from "routing-controllers";
import { Car } from "../../models";

import decodeVinAndCreateInstance from "../../../utils/decodeVinAndCreateInstance";

@JsonController("/cars")
export class Cars {
  @Get()
  getAll(): Promise<Car[]> {
    return Car.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: string): Promise<Car> {
    const entity = await Car.findOne(id);
    if (!entity) return undefined;
    return Car.findOne(id);
  }

  @Post()
  async create(@Body() body: Pick<Car, CarKeys>): Promise<Car|string> {
    const {
      licensePlate,
      registrationState,
      vin,
      description,
      year,
      registration,
      registrationExpiration,
      nameOnRegistration,
      color,
      fuel,
      value,
      mileage
    } = body;

    return decodeVinAndCreateInstance(
      licensePlate,
      registrationState,
      vin,
      description,
      year,
      registration,
      registrationExpiration,
      nameOnRegistration,
      color,
      fuel,
      value,
      mileage
    );
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() body: Pick<Car, CarKeys>): Promise<string> {
    const { affected } = await Car.update(id, {...body});
    if (!affected) return undefined;
    return "successfully updated";
  }

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<string> {
    const { affected } = await Car.delete(id);
    if (!affected) return undefined;
    return "successfully deleted";
  }
}

type CarKeys = "licensePlate"|"registration"|"registrationState"|"vin"|"description"|"year"|"type"|"fuel"|"doors"|"registration"|"registrationExpiration"|"nameOnRegistration"|"color"|"fuel"|"value"|"mileage";
