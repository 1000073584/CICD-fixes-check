import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { EmployeeService } from "../employee.service";
import { AddEmployeeComponent } from "./add-employee.component";

describe("AddEmployeeComponent", () => {
  let mockrouter: any;
  let mockEmployeeService: any;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let component: AddEmployeeComponent;

  beforeEach(() => {
    mockEmployeeService = jasmine.createSpyObj(["addEmployee"]);
    mockrouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AddEmployeeComponent],
      providers: [
        FormBuilder,
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
        {
          provide: Router,
          useValue: mockrouter,
        },
      ],
    });

    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
  });

  describe("add", () => {
    beforeEach(() => {
      mockEmployeeService.addEmployee.and.returnValue(of(true));
      fixture.detectChanges();
    });

    it("should add Employee and navigate to list Employee", () => {
      component.form.setValue({
        fname: "fname",
        lname: "lname",
      });
      component.add();
      mockrouter.navigate.and.returnValue(Promise.resolve(true));
      expect(mockrouter.navigate).toHaveBeenCalledWith(["/list-employee/"]);
    });
  });
});
