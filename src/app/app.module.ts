import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GstAddComponent } from './gst/gst-add/gst-add.component';
import { GstGetComponent } from './gst/gst-get/gst-get.component';
import { GstEditComponent } from './gst/gst-edit/gst-edit.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    GstAddComponent,
    GstGetComponent,
    GstEditComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [   {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
