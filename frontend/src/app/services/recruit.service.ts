import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Recruit } from '../models/recruit';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}
@Injectable({
  providedIn: 'root'
})
export class RecruitService {
  private _url = "http://127.0.0.1:8000/api/";
  private _indexUrl = this._url + "v1/recruits";
  private _createUpdateUrl = this._url + "v1/recruits";
  private _relatedUrl = this._url + "v1/recruits/related-data";
  private _selectEmployeesUrl = this._url + "v1/employees/dropdown-employees";
  private _selectJobsUrl = this._url + "v1/jobs/dropdown-jobs";
  employees = [];
  jobs = [];
  recruit;

  constructor(private http:HttpClient) { }

  recruitForm = new FormGroup({
    id: new FormControl(''),
    employee_id: new FormControl('', Validators.required),
    job_id: new FormControl('', Validators.required),
    joined_at: new FormControl('', [Validators.required]),
    condition: new FormControl('', [Validators.required])
  });

  initializeFormGroup() {    
    this.getEmployeesInDropdown();
    this.getJobsInDropdown();
    
    this.recruitForm.setValue({
      id:null,
      employee_id:'',
      job_id: '',
      joined_at: '',
      condition: ''
    });
  }

  populateForm(recruit) {
    Object.keys(recruit).forEach(name => {
      if (this.recruitForm.controls[name]) {
        this.recruitForm.controls[name].patchValue(recruit[name]);
      }
    });
    this.getEmployeesInDropdown();
    this.getJobsInDropdown();
  }

  //GET Recruit
	getRecruits(): Observable<Recruit[]> {
		return this.http.get<Recruit[]>(this._indexUrl, httpOptions);
  }

  //ADD Recruit
  createRecruit(recruit:Recruit) : Observable<Recruit> {
    return this.http.post<Recruit>(this._createUpdateUrl, recruit, httpOptions);
  }
  
  //UPDATE Recruit
  updateRecruit(recruit:Recruit) : Observable<Recruit> {
    return this.http.put<Recruit>(this._createUpdateUrl + '/' + recruit.id, recruit, httpOptions);
  }

  //GET employees in select option
  getEmployeesInDropdown() {
    return this.http.get(`${this._selectEmployeesUrl}`, httpOptions).subscribe(
      data=> {
        let oEmployees = data['data'];

        //change objects to array
        this.employees = Object.keys(oEmployees).map(key => ({id: key, name: oEmployees[key]}));
        this.employees = [...this.employees];
      }, error => console.error(error)
    );
  }

  //GET jobs in select option
  getJobsInDropdown() {
    return this.http.get(`${this._selectJobsUrl}`, httpOptions).subscribe(
      data=> {
        let oJobs = data['data'];

        //change objects to array
        this.jobs = Object.keys(oJobs).map(key => ({id: key, name: oJobs[key]}));
        this.jobs = [...this.jobs];
      }, error => console.error(error)
    );
  }

  getRelatedData(id:number) {    
    return this.http.get(this._relatedUrl + '/' + id, httpOptions);
  }
}
