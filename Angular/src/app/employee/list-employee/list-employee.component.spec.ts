import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { EmployeeService } from "../employee.service";
import { ListEmployeeComponent } from "./list-employee.component";
import { Employee } from "../employee";

describe("ListEmployeeComponent", () => {
  let mockpaginator: any;
  let mockdata: Employee[] = [];
  let mockEmployeeService: any;
  let fixture: ComponentFixture<ListEmployeeComponent>;
  let component: ListEmployeeComponent;

  beforeEach(() => {
    mockdata = [
      {
        fname: "fname",
        lname: "lname",
      },
    ];

    mockEmployeeService = jasmine.createSpyObj([
      "getEmployee",
      "deleteEmployee",
    ]);
    mockpaginator = jasmine.createSpyObj("MatPaginator", ["pageIndex"]);

    TestBed.configureTestingModule({
      declarations: [ListEmployeeComponent],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
      ],
    });

    fixture = TestBed.createComponent(ListEmployeeComponent);
    component = fixture.componentInstance;
  });

  it("should get all the Employees", async () => {
    mockEmployeeService.getEmployee.and.returnValue(of(mockdata));
    fixture.detectChanges();
    expect(component.data).toBe(mockdata);
  });

  describe("delete", () => {
    beforeEach(() => {
      mockEmployeeService.deleteEmployee.and.returnValue(of(true));
      component.dataSource.data = mockdata;
      component.paginator = mockpaginator;
    });

    it("should delete the Employee by id", () => {
      component.delete(0, 0);
      expect(component.data.length).toBe(0);
    });
  });
});
