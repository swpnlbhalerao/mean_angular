import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onSubmit(regForm: NgForm) {

     console.log(regForm.value); 
    this.errorMessage = '';
    if (!regForm.valid) {
        return;
    }
    let authObs: Observable<AuthResponse>;
    //this.isLoading = true;
   
        authObs = this.authService.signUp(regForm.value);
        /* console.log(authForm.value); */
   
        authObs.subscribe(
        (responseData) => {
           // this.isLoading = false;
         this.router.navigate(['/login']);
          console.log(responseData);
        }, errorMessageMessage => {
          //  this.isLoading = false;
            console.log(errorMessageMessage);
            this.errorMessage = errorMessageMessage;
        })
        regForm.reset();

}


}
