import { Schoolstudent } from "src/entities/schoolstudent.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SchoolstudentService } from "src/services/schoolstudent.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("SchoolstudentService", () => {
  let service: SchoolstudentService;
  let repo: Repository<Schoolstudent>;

  const singleSchoolstudent = {
    id: 1,
    fname: "rapidx",
    lname: "rapidx",
  } as Schoolstudent;

  const multipleSchoolstudents = [
    {
      id: 1,
      fname: "rapidx",
      lname: "rapidx",
    },
  ] as Schoolstudent[];


  beforeEach(async () => {
    const mockRepo = {
      find: () => Promise.resolve(multipleSchoolstudents),
      findOne: (id: number) => Promise.resolve(singleSchoolstudent),
      save: (schoolstudent: Schoolstudent) => Promise.resolve(schoolstudent),
      create: (schoolstudent: Schoolstudent) => schoolstudent,
      remove: (schoolstudent: Schoolstudent) => Promise.resolve(schoolstudent),
    };

    const module = await Test.createTestingModule({
      providers: [
        SchoolstudentService,
        {
          provide: getRepositoryToken(Schoolstudent),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(SchoolstudentService);
    repo = module.get(getRepositoryToken(Schoolstudent));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all schoolstudents from database", async () => {
      const schoolstudents = await service.fetchAll();
      expect(schoolstudents.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one schoolstudent from the database", async () => {
      const schoolstudent = await service.fetchOne(1);
      expect(schoolstudent.fname).toEqual(singleSchoolstudent.fname);
      expect(schoolstudent.lname).toEqual(singleSchoolstudent.lname);
    });
    it("should fetch no schoolstudents from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const schoolstudent = await service.fetchOne(1);
      expect(schoolstudent).toBeNull();
    });
  });

  describe("Create schoolstudent", () => {
    it("should create the schoolstudent of the specified values", async () => {
      const schoolstudent = await service.create(singleSchoolstudent);
      expect(schoolstudent.fname).toEqual(singleSchoolstudent.fname);
      expect(schoolstudent.lname).toEqual(singleSchoolstudent.lname);
    });
  });

  describe("Update schoolstudent", () => {
    it("should return null when schoolstudent is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const schoolstudent = await service.update(1, {});
      expect(schoolstudent).toBeNull();
    });

    it("should update the schoolstudent of the specified id", async () => {
      const schoolstudent = await service.update(1, singleSchoolstudent);
      expect(schoolstudent.fname).toEqual(singleSchoolstudent.fname);
      expect(schoolstudent.lname).toEqual(singleSchoolstudent.lname);
    });
  });

  describe("Delete schoolstudent", () => {
    it("should return null when schoolstudent is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const schoolstudent = await service.delete(1);
      expect(schoolstudent).toBeNull();
    });

    it("should delete the schoolstudent of the specified id", async () => {
      const schoolstudent = await service.delete(1);
      expect(schoolstudent.id).toEqual(1);
    });
  });
});
