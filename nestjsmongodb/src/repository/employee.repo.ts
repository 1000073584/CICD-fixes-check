import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { employee, employeeDocument } from 'src/schemas/employee.schema';

@Injectable()
export class employeeRepo {
    constructor(
        @InjectModel(employee.name)
        private readonly employeeModel: Model<employeeDocument>) {}

    async create(data): Promise<employee> {
        return new this.employeeModel(data).save();
    }

    async findAll(): Promise<employee[]> {
        return this.employeeModel.find({})
            .exec();
    }

    async update(employeeId, data): Promise<employee> {
        const filter = { _id: employeeId };
        return this.employeeModel.findOneAndUpdate(filter, data);
    }

    async delete(employeeId): Promise<employee> {
        const filter = { _id: employeeId };
        return this.employeeModel.findByIdAndDelete(employeeId);
    }
}