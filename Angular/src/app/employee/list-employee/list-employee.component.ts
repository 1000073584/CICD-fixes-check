import { Component, ViewChild, OnInit } from "@angular/core";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-employee",
  templateUrl: "./list-employee.component.html",
  styleUrls: ["./list-employee.component.css"],
})
export class ListEmployeeComponent implements OnInit {
  data: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ["fname", "lname", "action"];

  constructor(public service: EmployeeService) {}

  ngOnInit(): void {
    this.service.getEmployee().subscribe((data: Employee[]) => {
      this.data = data;
      this.dataSource = new MatTableDataSource<Employee>(this.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  delete(index: number, id: number) {
    const data = this.dataSource.data;
    data.splice(this.paginator.pageIndex * this.paginator.pageSize + index, 1);
    this.dataSource.data = data;
    this.service.deleteEmployee(id).subscribe();
  }
}
