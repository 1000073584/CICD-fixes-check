import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeRoutes } from "./employee.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeeComponent,
  ],
})
export class EmployeeModule {}
