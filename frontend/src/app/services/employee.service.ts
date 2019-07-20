import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Employee } from '../models/employee';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _url = "http://127.0.0.1:8000/api/";
  private _indexUrl = this._url + "v1/employees";
  private _createUpdateUrl = this._url + "v1/employees";
  
  constructor(private http:HttpClient) { }

  employeeForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    contact_number: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.employeeForm.setValue({
      id:null,
      first_name:'',
      last_name:'',
      gender: '',
      contact_number:''
    });
  }

  populateForm(employee) {
    Object.keys(employee).forEach(name => {
      if (this.employeeForm.controls[name]) {
        this.employeeForm.controls[name].patchValue(employee[name]);
      }
    });
  }

  //GET Employee
	getEmployees(): Observable<Employee[]> {
		return this.http.get<Employee[]>(`${this._indexUrl}`, httpOptions);
  }

  //ADD Employee
  createEmployee(employee:Employee) : Observable<Employee> {
    return this.http.post<Employee>(this._createUpdateUrl, employee, httpOptions);
  }

  //UPDATE Employee
  updateEmployee(employee:Employee) : Observable<Employee> {
    return this.http.put<Employee>(this._createUpdateUrl + '/' + employee.id, employee, httpOptions);
  }
}
