import { Body, Get, JsonController, Post, Put, Delete, Param } from "routing-controllers";
import { ExampleEntity } from "../../models";

import decodeVinAndCreateInstance from "../../../utils/decodeVinAndCreateInstance";

@JsonController("/example-entity")
export class UserController {
  @Get()
  getAll(): Promise<ExampleEntity[]> {
    return ExampleEntity.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: string): Promise<ExampleEntity> {
    const entity = await ExampleEntity.findOne(id);
    if (!entity) return undefined;
    return ExampleEntity.findOne(id);
  }

  @Post()
  async create(@Body() body: Pick<ExampleEntity, ExampleEntityKeys>): Promise<ExampleEntity|string> {
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
  async update(@Param("id") id: string, @Body() body: Pick<ExampleEntity, ExampleEntityKeys>): Promise<string> {
    const { affected } = await ExampleEntity.update(id, {...body});
    if (!affected) return undefined;
    return "successfully updated";
  }

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<string> {
    const { affected } = await ExampleEntity.delete(id);
    if (!affected) return undefined;
    return "successfully deleted";
  }
}

type ExampleEntityKeys = "licensePlate"|"registration"|"registrationState"|"vin"|"description"|"year"|"type"|"fuel"|"doors"|"registration"|"registrationExpiration"|"nameOnRegistration"|"color"|"fuel"|"value"|"mileage";
