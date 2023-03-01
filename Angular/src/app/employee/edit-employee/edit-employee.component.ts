import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.css"],
})
export class EditEmployeeComponent implements OnInit {
  data!: Employee;
  id!: any;
  form!: FormGroup;
  private sub!: Subscription;

  constructor(
    public fb: FormBuilder,
    private _router: Router,
    public service: EmployeeService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var id = this.actRoute.snapshot.params["id"];
    this.service.getEmployeeById(id).subscribe((data: Employee) => {
      this.data = data;
    });
    this.update();
  }

  update() {
    this.form = new FormGroup({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
    });
  }

  edit() {
    if (this.form.valid) {
      var id = this.actRoute.snapshot.params["id"];
      this.service.editEmployee(id, this.form.value).subscribe((res) => {
        this._router.navigate(["/list-employee/"]);
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
