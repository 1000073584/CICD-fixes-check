import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchoolstudentController } from "src/controllers/schoolstudent.controller";
import { Schoolstudent } from "src/entities/schoolstudent.entity";
import { SchoolstudentService } from "src/services/schoolstudent.service";

@Module({
  imports: [TypeOrmModule.forFeature([Schoolstudent])],
  controllers: [SchoolstudentController],
  providers: [SchoolstudentService],
})
export class SchoolstudentModule {}
