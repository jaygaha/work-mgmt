import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/pages/about/about.component';
import { MeComponent } from './components/user/me/me.component';
import { AuthGuard } from './guards/auth.guard';
import { HakenComponent } from './components/haken/haken.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	// home route protected by auth guard
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'hakens', component: HakenComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
