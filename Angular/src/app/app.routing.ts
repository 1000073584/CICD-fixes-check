import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AddEmployeeComponent } from "./employee/add-employee/add-employee.component";
import { EditEmployeeComponent } from "./employee/edit-employee/edit-employee.component";
import { ListEmployeeComponent } from "./employee/list-employee/list-employee.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
        { path: 'add-employee', component: AddEmployeeComponent },
        { path: 'edit-employee/:id', component: EditEmployeeComponent },
        { path: 'list-employee', component: ListEmployeeComponent },
    ]
  }
];
