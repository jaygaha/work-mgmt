import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Job } from '../models/job';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _url = "http://127.0.0.1:8000/api/";
  private _indexUrl = this._url + "v1/jobs";
  private _createUpdateUrl = this._url + "v1/jobs";
  private _selectCompanyUrl = this._url + "v1/companies/dropdown-companies";
  private _selectHakenUrl = this._url + "v1/haken/dropdown-hakens";
  companies = [];
  hakens = [];

  constructor(private http:HttpClient) { }

  jobForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    company_id: new FormControl('', Validators.required),
    description: new FormControl(''),
    pph_amount: new FormControl('', [Validators.required]),
    ot_amount: new FormControl('', [Validators.required]),
    night_pph_amount: new FormControl('', [Validators.required]),
    night_ot_amount: new FormControl('', [Validators.required]),
    teji: new FormControl('', [Validators.required]),
    haken_id: new FormControl('', Validators.required),
  });

  initializeFormGroup() {    
    this.getCompaniesInDropdown();
    this.getHakensInDropdown();
    
    this.jobForm.setValue({
      id:null,
      name:'',
      company_id: '',
      description: '',
      pph_amount: '',
      ot_amount: '',
      night_pph_amount: '',
      night_ot_amount: '',
      teji: 8,
      haken_id: ''
    });
  }

  populateForm(job) {
    Object.keys(job).forEach(name => {
      if (this.jobForm.controls[name]) {
        this.jobForm.controls[name].patchValue(job[name]);
      }
    });
    this.getCompaniesInDropdown();
    this.getHakensInDropdown(job.hakens);
    //this.jobForm.patchValue({"haken_id": job.hakens});
  }
  
  //GET Companies in select option
	getCompaniesInDropdown() {
		return this.http.get(`${this._selectCompanyUrl}`, httpOptions).subscribe(
      data=> {
        let oCompanies = data['data'];
        this.companies = Object.keys(oCompanies).map(key => ({id: key, name: oCompanies[key]}));
        this.companies = [...this.companies];
      }, error => console.error(error)
    );
  }

  //GET Hakens in select option
	getHakensInDropdown(hakens = false) {
		return this.http.get(`${this._selectHakenUrl}`, httpOptions).subscribe(
      data=> {
        let oHakens = data['data'];
        this.hakens = Object.keys(oHakens).map(key => ({id: key, name: oHakens[key]}));
        this.hakens = [...this.hakens];
        if (hakens)
          this.jobForm.controls['haken_id'].patchValue(hakens);
      }, error => console.error(error)
    );
  }

  //GET Job
	getJobs(): Observable<Job[]> {
		return this.http.get<Job[]>(this._indexUrl, httpOptions);
  }

  //ADD Job
  createJob(job:Job) : Observable<Job> {
    return this.http.post<Job>(this._createUpdateUrl, job, httpOptions);
  }
  
  //UPDATE Job
  updateJob(job:Job) : Observable<Job> {
    return this.http.put<Job>(this._createUpdateUrl + '/' + job.id, job, httpOptions);
  }
}
