import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/pages/about/about.component';
import { MeComponent } from './components/user/me/me.component';
import { AuthGuard } from './guards/auth.guard';
import { HakenComponent } from './components/haken/haken.component';
import { CompanyComponent } from './components/company/company.component';
import { JobComponent } from './components/job/job.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { RecruitComponent } from './components/recruit/recruit.component';
import { WorklogComponent } from './components/worklog/worklog.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	// home route protected by auth guard
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'hakens', component: HakenComponent, canActivate: [AuthGuard] },
  { path: 'companies', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'recruits', component: RecruitComponent, canActivate: [AuthGuard] },
  { path: 'recruits/work-logs/:recruit_id', component: WorklogComponent, canActivate: [AuthGuard] },
  { path: 'recruits/payments/:recruit_id', component: PaymentComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
