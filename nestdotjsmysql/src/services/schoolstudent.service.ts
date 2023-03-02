import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Schoolstudent } from "src/entities/schoolstudent.entity";
import { Repository } from "typeorm";

@Injectable()
export class SchoolstudentService {
  constructor(
    @InjectRepository(Schoolstudent)
    private schoolstudentRepo: Repository<Schoolstudent>,
  ) {}

  fetchAll() {
    return this.schoolstudentRepo.find();
  }

  fetchOne(id: number) {
    return this.schoolstudentRepo.findOne({
      where: { id },
    });
  }

  create(schoolstudent: Schoolstudent) {
    const newSchoolstudent = this.schoolstudentRepo.create(schoolstudent);
    return this.schoolstudentRepo.save(newSchoolstudent);
  }

  async update(id: number, attrs: Partial<Schoolstudent>) {
    const schoolstudent = await this.fetchOne(id);

    if (!schoolstudent) {
      return null;
    }

    Object.assign(schoolstudent, attrs);
    return this.schoolstudentRepo.save(schoolstudent);
  }

  async delete(id: number) {
    const schoolstudent = await this.fetchOne(id);

    if (!schoolstudent) {
      return null;
    }

    return this.schoolstudentRepo.remove(schoolstudent);
  }
}
