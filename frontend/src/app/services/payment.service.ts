import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Payment } from '../models/payment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _url = "http://127.0.0.1:8000/api/";
  private _indexUrl = this._url + "v1/payments";
  private _createUpdateUrl = this._url + "v1/payments";

  constructor(private http:HttpClient) { }

  paymentForm = new FormGroup({
    id: new FormControl(''),
    recruit_id: new FormControl(''),
    payment_of: new FormControl('', Validators.required),
  });

  //GET Payment
	getPayment(recruitId): Observable<Payment[]> {
		return this.http.get<Payment[]>(this._indexUrl + '/' + recruitId, httpOptions);
  }
  
  //GET Selected Payment
	getSelectedPayment(recruitId, year, month): Observable<Payment[]> {
		return this.http.get<Payment[]>(this._indexUrl + '/' + recruitId + '/' + year + '/' + month, httpOptions);
  }

}
