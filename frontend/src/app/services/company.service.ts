import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Company } from '../models/company';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private _url = "http://127.0.0.1:8000/api";
  private _indexUrl = this._url + "/v1/companies";
  private _createUpdateUrl = this._url + "/v1/companies";

  constructor(private http:HttpClient) { }

  companyForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      contact_number: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.companyForm.setValue({
      id:null,
      name:'',
      address: '',
      contact_number:'' 
    });
  }

  populateForm(company) {
    Object.keys(company).forEach(name => {
      if (this.companyForm.controls[name]) {
        this.companyForm.controls[name].patchValue(company[name]);
      }
    });
  }

  //GET Company
	getCompanies(): Observable<Company[]> {
		return this.http.get<Company[]>(`${this._indexUrl}`, httpOptions);
  }

  //ADD company
  createCompany(company:Company) : Observable<Company> {
    return this.http.post<Company>(this._createUpdateUrl, company, httpOptions);
  }

  //UPDATE company
  updateCompany(company:Company) : Observable<Company> {
    return this.http.put<Company>(this._createUpdateUrl + '/' + company.id, company, httpOptions);
  }
}
