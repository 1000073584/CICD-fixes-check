import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeController } from '../controllers/employee.controller';
import { employeeService } from '../services/employee.service';
import { employeeRepo } from '../repository/employee.repo';
import { employee, employeeSchema } from '../schemas/employee.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: employee.name, schema: employeeSchema }])
    ],
    controllers: [employeeController],
    providers: [employeeService, employeeRepo],
    exports: [employeeService, employeeRepo]
  })
  export class employeeModule { }