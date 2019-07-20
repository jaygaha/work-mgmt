import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginUserData = {}
	constructor(private _auth: AuthService,
  private _router: Router) { }

	ngOnInit() {
    // const element = document.querySelector('[rel="stylesheet"]');
    // console.log(element);
    // document.getElementById("fontawesome").remove();
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-dark');
    body.classList.remove('page-top');
	}

	loginUser() {
		this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.access_token);
        this._router.navigate(['/']);
        },
      err => console.log(err)
    )
  }
  
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('page-top');
    body.classList.remove('bg-dark');
  }
}
