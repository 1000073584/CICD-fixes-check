import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"],
})
export class AddEmployeeComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private _router: Router,
    public service: EmployeeService
  ) {}

  ngOnInit(): void {
    this.submit();
  }

  submit() {
    this.form = this.fb.group({
      fname: ["", [Validators.required]],
      lname: ["", [Validators.required]],
    });
  }

  add() {
    if (this.form.valid) {
      this.service.addEmployee(this.form.value).subscribe((res) => {
        this._router.navigate(["/list-employee/"]);
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
