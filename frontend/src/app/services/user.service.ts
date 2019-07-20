import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url = "http://127.0.0.1:8000/api";
  private _meUrl = this._url + "/auth/me";

  constructor(private http: HttpClient) { }

  getMe() {
		return this.http.get<any>(`${this._meUrl}`);	 
  }
}
