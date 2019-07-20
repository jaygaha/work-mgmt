import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Haken } from '../models/haken';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
  providedIn: 'root'
})
export class HakenService {
  private _url = "http://127.0.0.1:8000/api";
  private _indexUrl = this._url + "/v1/haken";
  private _createUpdateUrl = this._url + "/v1/haken";
  
  constructor(private http:HttpClient) { }
  
  hakenForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      contact_number: new FormControl('', Validators.required),
  });
  
  initializeFormGroup() {
    this.hakenForm.setValue({
      id:null,
      name:'',
      address: '',
      contact_number:'' 
    });
  }

  populateForm(haken) {
    Object.keys(haken).forEach(name => {
      if (this.hakenForm.controls[name]) {
        this.hakenForm.controls[name].patchValue(haken[name]);
      }
    });
    // this.hakenForm.setValue(haken);
  }

  //GET Haken
	getHakens():Observable<Haken[]> {
		return this.http.get<Haken[]>(`${this._indexUrl}`);
  }

  //ADD Haken
  createHaken(haken) {
    return this.http.post<Haken>(this._createUpdateUrl, haken, httpOptions);
  }
  
  //UPDATE Haken
  updateHaken(haken) {
    return this.http.put<Haken>(this._createUpdateUrl + '/' + haken.id, haken, httpOptions);
  }
}
