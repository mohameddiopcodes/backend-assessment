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
  create(@Body() body: Pick<ExampleEntity, "exampleColumn">): Promise<ExampleEntity> {
    return ExampleEntity.create(body).save();
  }

  @Put("/:id")
  update(@Param("id") id: string, @Body() body: Pick<ExampleEntity, "exampleColumn">): Promise<UpdateResult> {
    return ExampleEntity.update(id, {...body});
  }

  @Delete("/:id")
  delete(@Param("id") id: string): Promise<DeleteResult> {
    return ExampleEntity.delete(id);
  }
}
