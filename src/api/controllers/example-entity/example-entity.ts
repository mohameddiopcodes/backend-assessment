import axios from "axios";
import { Body, Get, JsonController, Post, Put, Delete, Param } from "routing-controllers";
import { DeleteResult, UpdateResult } from "typeorm";
import { ExampleEntity } from "../../models";

@JsonController("/example-entity")
export class UserController {
  @Get()
  getAll(): Promise<ExampleEntity[]> {
    return ExampleEntity.find();
  }

  @Get("/:id")
  getOne(@Param("id") id: string): Promise<ExampleEntity> {
    return ExampleEntity.findOne(id);
  }

  @Post()
  async create(@Body() body: Pick<ExampleEntity, ExampleEntityKeys>): Promise<ExampleEntity> {
    const {
      licensePlate,
      registrationState,
      vin,
      description,
      year
    } = body;

    const decoded = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/" + vin + "?format=json&modelyear=2011");

    console.log(decoded.data.Results);

    const entity = ExampleEntity.create({
      licensePlate,
      registrationState,
      vin,
      description,
      year
    });

    entity.make = decoded.data.Results[0].Make;
    entity.model = decoded.data.Results[0].Model;
    entity.year = decoded.data.Results[0].ModelYear;
    return entity;
  }

  @Put("/:id")
  update(@Param("id") id: string, @Body() body: Pick<ExampleEntity, ExampleEntityKeys>): Promise<UpdateResult> {
    return ExampleEntity.update(id, {...body});
  }

  @Delete("/:id")
  delete(@Param("id") id: string): Promise<DeleteResult> {
    return ExampleEntity.delete(id);
  }
}

type ExampleEntityKeys = "licensePlate"|"registration"|"registrationState"|"vin"|"description"|"year";
