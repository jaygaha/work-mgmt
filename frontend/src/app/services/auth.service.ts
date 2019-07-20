import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private _url = "http://127.0.0.1:8000/api/";
	private _registerUrl = this._url + "auth/signup";
	private _loginUrl = this._url + "auth/login";
	private _logoutUrl = this._url + "auth/logout";
  	
	constructor(private http: HttpClient,
		private _router: Router
		) { }

  	// registerUser(user) {
  	// 	return this.http.post<any>(this.registerUrl, user);
  	// }

  	loginUser(user) {
  		return this.http.post<any>(this._loginUrl, user);
  	}

  	loggedIn() {
  		return !!localStorage.getItem('token');
  	}
	
	/**
	 * 
	 */
	logoutUser() {
		localStorage.removeItem('token');
		localStorage.clear();
		this.http.get<any>(`${this._logoutUrl}`); //logout from backend also
		this._router.navigate(['/login']);
	}
    getToken() {
      return localStorage.getItem('token');
    }
}
