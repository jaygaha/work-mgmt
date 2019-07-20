import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AboutComponent } from './components/pages/about/about.component';
import { MeComponent } from './components/user/me/me.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import { NavFooterComponent } from './components/nav-footer/nav-footer.component';
import { HakenComponent } from './components/haken/haken.component';
import { HakenService } from './services/haken.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AboutComponent,
    MeComponent,
    NavHeaderComponent,
    NavSidebarComponent,
    NavFooterComponent,
    HakenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthService, 
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    HakenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
