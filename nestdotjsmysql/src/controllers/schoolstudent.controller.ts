import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { Schoolstudent } from "src/entities/schoolstudent.entity";
import { SchoolstudentService } from "src/services/schoolstudent.service";

@Controller("/schoolstudent")
export class SchoolstudentController {
  constructor(private schoolstudentService: SchoolstudentService) {}

  @Get("")
  fetchAll() {
    return this.schoolstudentService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const schoolstudent = await this.schoolstudentService.fetchOne(+id);

    if (!schoolstudent) throw new NotFoundException("Schoolstudent not found");

    return schoolstudent;
  }

  @Post()
  create(@Body() schoolstudent: Schoolstudent) {
    return this.schoolstudentService.create(schoolstudent);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() schoolstudent: Partial<Schoolstudent>) {
    const receivedSchoolstudent = await this.schoolstudentService.update(+id, schoolstudent);

    if (!receivedSchoolstudent) throw new NotFoundException("Schoolstudent not found");

    return receivedSchoolstudent;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedSchoolstudent = await this.schoolstudentService.delete(+id);

    if (!receivedSchoolstudent) throw new NotFoundException("Schoolstudent not found");

    return receivedSchoolstudent;
  }
}
