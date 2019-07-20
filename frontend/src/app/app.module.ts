import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

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
import { CompanyComponent } from './components/company/company.component';
import { JobComponent } from './components/job/job.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { RecruitComponent } from './components/recruit/recruit.component';
import { WorklogComponent } from './components/worklog/worklog.component';
import { PaymentComponent } from './components/payment/payment.component';

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
    HakenComponent,
    CompanyComponent,
    JobComponent,
    EmployeeComponent,
    RecruitComponent,
    WorklogComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
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
