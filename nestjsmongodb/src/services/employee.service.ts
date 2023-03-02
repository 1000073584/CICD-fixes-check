import { Injectable } from '@nestjs/common';
import { employeeRepo } from '../repository/employee.repo';
import { employee } from '../schemas/employee.schema';

@Injectable()
export class employeeService {
    constructor(
        private readonly employeeRepo: employeeRepo
    ) { }

    async findAll(): Promise<employee[]> {
        return this.employeeRepo.findAll();
    }

    async create(data): Promise<employee> {
        data.createddate = new Date();
        return this.employeeRepo.create(data);
    }

    async update(employeeId, data): Promise<employee> {
        return this.employeeRepo.update(employeeId, data);
    }

    async delete(employeeId): Promise<employee> {
        return this.employeeRepo.delete(employeeId);
    }
}