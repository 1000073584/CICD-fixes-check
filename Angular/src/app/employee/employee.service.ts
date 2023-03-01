import { Injectable } from "@angular/core";
import { Employee } from "./employee";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  endpoint = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getEmployeeById(id: any): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}/employee/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getEmployee(): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}/employee`)
      .pipe(catchError(this.errorHandler));
  }

  addEmployee(data: Employee): Observable<any> {
    return this.httpClient
      .post(`${this.endpoint}/employee`, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  editEmployee(id: any, data: Employee): Observable<any> {
    return this.httpClient
      .put(
        `${this.endpoint}/employee/${id}`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient
      .delete(`${this.endpoint}/employee/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Error handling
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
