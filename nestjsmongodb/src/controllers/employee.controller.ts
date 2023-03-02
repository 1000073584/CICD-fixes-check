import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { employeeDto } from '../dto/employee-dto.dto';
import { employeeService } from '../services/employee.service';


@Controller('employee')
export class employeeController {
    constructor(private readonly employeeService: employeeService) { }

    @Post()
    async create(@Body() employeeDto: employeeDto) {
        const res = this.employeeService.create(employeeDto);
        return res;
    }

    @Get()
    async findAll() {
        return this.employeeService.findAll();
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() employeeDto: employeeDto) {
        return this.employeeService.update(id, employeeDto);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.employeeService.delete(id);
    }
}