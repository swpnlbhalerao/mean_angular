import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GstAddComponent } from './gst/gst-add/gst-add.component';
import { GstEditComponent } from './gst/gst-edit/gst-edit.component';
import { GstGetComponent } from './gst/gst-get/gst-get.component';
import { AuthGaurd } from './auth/auth.gaurd';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [

  { path: '', redirectTo: "/business", pathMatch: "full" },
  {
    path: 'business/create', canActivate: [AuthGaurd],
    component: GstAddComponent
  },
  {
    path: 'business/edit/:id', canActivate: [AuthGaurd],
    component: GstEditComponent
  },
  {
    path: 'business', canActivate: [AuthGaurd],
    component: GstGetComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
