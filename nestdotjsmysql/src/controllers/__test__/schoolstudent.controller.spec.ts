import { Test } from "@nestjs/testing";
import { SchoolstudentService } from "src/services/schoolstudent.service";
import { SchoolstudentController } from "src/controllers/schoolstudent.controller";
import { Schoolstudent } from "src/entities/schoolstudent.entity";

describe("SchoolstudentController", () => {
  let controller: SchoolstudentController;
  let service: SchoolstudentService;

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
    const mockService = {
      fetchAll: () => Promise.resolve(multipleSchoolstudents),
      fetchOne: (id: number) => Promise.resolve(singleSchoolstudent),
      create: (schoolstudent: Schoolstudent) => Promise.resolve(schoolstudent),
      delete: (id: number) => Promise.resolve(singleSchoolstudent),
      update: (id: number, schoolstudent: Partial<Schoolstudent>) => Promise.resolve(schoolstudent),
    };

    const module = await Test.createTestingModule({
      controllers: [SchoolstudentController],
      providers: [
        {
          provide: SchoolstudentService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(SchoolstudentController);
    service = module.get(SchoolstudentService);
  });

  describe("fetchAll", () => {
    it("should fetch all schoolstudents", async () => {
      const schoolstudents = await controller.fetchAll();
      expect(schoolstudents.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one schoolstudent for the given id", async () => {
      const schoolstudent = await controller.fetchOne("1");
      expect(schoolstudent.fname).toEqual(singleSchoolstudent.fname);
      expect(schoolstudent.lname).toEqual(singleSchoolstudent.lname);
    });
  });

  describe("Create schoolstudent", () => {
    it("should create a schoolstudent", async () => {
      const schoolstudent = await controller.create(singleSchoolstudent);
      expect(schoolstudent.fname).toEqual(singleSchoolstudent.fname);
      expect(schoolstudent.lname).toEqual(singleSchoolstudent.lname);
    });
  });

  describe("Update schoolstudent", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, schoolstudent: Partial<Schoolstudent>) => Promise.resolve(null);
      await expect(controller.update("1", singleSchoolstudent)).rejects.toThrow();
    });

    it("should return one schoolstudent for the given id", async () => {
      const schoolstudent = await controller.update("1", singleSchoolstudent);
      expect(schoolstudent.fname).toEqual(singleSchoolstudent.fname);
      expect(schoolstudent.lname).toEqual(singleSchoolstudent.lname);
    });
  });

  describe("Delete schoolstudent", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one schoolstudent for the given id", async () => {
      const schoolstudent = await controller.delete("1");
      expect(schoolstudent.fname).toEqual(singleSchoolstudent.fname);
      expect(schoolstudent.lname).toEqual(singleSchoolstudent.lname);
    });
  });
});
