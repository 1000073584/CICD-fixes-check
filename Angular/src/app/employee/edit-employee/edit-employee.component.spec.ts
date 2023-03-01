import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";
import { EditEmployeeComponent } from "./edit-employee.component";

describe("EditEmployeeComponent", () => {
  let mockrouter: any;
  let mockActivatedRoute: any;
  let mockdata: Employee;
  let mockEmployeeService: any;
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;

  beforeEach(() => {
    mockdata = {
      fname: "fname",
      lname: "lname",
    };

    mockEmployeeService = jasmine.createSpyObj([
      "getEmployeeById",
      "editEmployee",
    ]);
    mockrouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EditEmployeeComponent],
      providers: [
        FormBuilder,
        { provide: EmployeeService, useValue: mockEmployeeService },
        {
          provide: ActivatedRoute,
          useValue: (mockActivatedRoute = {
            snapshot: { params: { id: "1" } },
          }),
        },
        { provide: Router, useValue: mockrouter },
      ],
    });
    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
  });

  it("should get the Employee by id", () => {
    component.id = mockActivatedRoute.snapshot.params["id"];
    mockEmployeeService.getEmployeeById.and.returnValue(of(mockdata));
    fixture.detectChanges();
    expect(component.data).toEqual(mockdata);
  });

  describe("edit", () => {
    beforeEach(() => {
      component.id = mockActivatedRoute.snapshot.params["id"];
      mockEmployeeService.getEmployeeById.and.returnValue(of(mockdata));
      mockEmployeeService.editEmployee.and.returnValue(of(true));
      fixture.detectChanges();
    });

    it("should edit the Employee by id", () => {
      component.id = mockActivatedRoute.snapshot.params["id"];
      component.form.setValue({
        fname: "fname",
        lname: "lname",
      });
      component.edit();
      mockrouter.navigate.and.returnValue(Promise.resolve(true));
      expect(mockrouter.navigate).toHaveBeenCalledWith(["/list-employee/"]);
    });
  });
});
