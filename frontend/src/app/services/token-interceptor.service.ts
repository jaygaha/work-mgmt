import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { tap } from "rxjs/operators";
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector, private router: Router) {}

  intercept(req, next) {
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authService.getToken()
      }
    })
    //logging the updated Parameters to browser's console
    // console.log("Before making api call : ", tokenizedReq.headers);
    //return next.handle(tokenizedReq);
    return next.handle(tokenizedReq).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        localStorage.clear(); //clear all the locally stored values
        this.router.navigate(['login']);
      }
    }));
  }
}
