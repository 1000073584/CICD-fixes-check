import { Routes } from "@angular/router";

import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";

export const EmployeeRoutes: Routes = [
  { path: "add-employee", component: AddEmployeeComponent },
  { path: "edit-employee/:id", component: EditEmployeeComponent },
  { path: "list-employee", component: ListEmployeeComponent },
];
