import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponse } from '../auth-service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  ngOnInit(): void {
  console.log("Login oninit")
  }



  constructor(private authService: AuthService, private router: Router) { }
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = '';


  register() {
   // this.isLoginMode = !this.isLoginMode;

   //this.router.navigate(['/recipe']);
    this.router.navigate(['register']);

}


  onSubmit(loginForm: NgForm) {
      this.errorMessage = '';
      if (!loginForm.valid) {
          return;
      }
      let authObs: Observable<AuthResponse>;
      const email = loginForm.value.email;
      const password = loginForm.value.password;
    //  this.isLoading = true;
       authObs = this.authService.login(email, password);
    

      authObs.subscribe(
          (responseData) => {
              this.isLoading = false;
              this.router.navigate(['/business']);

                  console.log(responseData);
          }, errorMessage=> {
            //  this.isLoading = false;
              console.log(errorMessage);
              this.errorMessage = errorMessage;
          })
          loginForm.reset();

  }

  onHandleerrorMessage(){
      this.errorMessage=null;
  }



}
