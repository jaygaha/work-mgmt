import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  modalRef: BsModalRef;
  showAlert: boolean = false;
  messageAlert: string = '';

  constructor(private _employeeService: EmployeeService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this._employeeService.getEmployees()
      .subscribe(
      employees => {
        let data = employees['data']; 
        this.employees = data;
      },
      err => console.log(err)
    );
  }

  createEmployeeModal(template: TemplateRef<any>) {
    this._employeeService.initializeFormGroup();
    this.modalRef = this.modalService.show(template);
  }

  editEmployeeModal(template: TemplateRef<any>, haken) {
    this._employeeService.populateForm(haken);
    this.modalRef = this.modalService.show(template, haken);
  }

  compare(val1, val2) {
    return val1 === val2;
  }

  onSubmit() {
    if (this._employeeService.employeeForm.valid) {
      if (!this._employeeService.employeeForm.get('id').value)
      this._employeeService.createEmployee(this._employeeService.employeeForm.value).subscribe(
        employee=> {
          let data = employee['data'];
          let message = employee['message'];

          this.employees.push(data);
          this.showAlert = true;
          this.messageAlert = message;
        },
        err => console.log(err)
        );
      else
        this._employeeService.updateEmployee(this._employeeService.employeeForm.value).subscribe(
          employee=>{
            let data = employee['data'];
            let message = employee['message'];
            
            this.employees.forEach((t, i) => {
              if (t.id == data.id) { this.employees[i] = data }
            });
            this.showAlert = true;
            this.messageAlert = message;
          },
          err=> console.log(err)
        );

      this.modalRef.hide();
      this._employeeService.employeeForm.reset();
    }
  }
}
