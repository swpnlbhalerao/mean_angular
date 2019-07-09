import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, pipe } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { AppService } from '../app-services';
import { UserLogReg } from './login/user-login-reg.model';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponse {
    userId:string,
    email: string,
    authToken:string,
    kind?: string,
    idToken?: string,
    refreshToken?: string,
    expiresIn?: string,
    localId?: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    //  user = new Subject<User>();
    user = new BehaviorSubject<User>(null);//return data from previous subrciption
    tokenExpirationTImer: any;
    errorMessage: String = "An unknow error occurred";
    constructor(private http: HttpClient, private router: Router,private appService:AppService) {

    }

    signUp(userDetails:UserLogReg) {
      console.log(userDetails);
      
        return this.appService.postData('/user/register',null,userDetails);
        

        /* return this.http.post<AuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+environment.fireBaseApiKey,
           ; */
    }
     login(email: string, password: string) {
            let loginDetails={
                email:email,
                password:password
            }
        /* return this.http.post<AuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+environment.fireBaseApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(responseData => {
            this.handleAuthenication(responseData.email, responseData.idToken, responseData.idToken, +responseData.expiresIn);
        })); */
        return this.appService.postData('/user/login',null,loginDetails).pipe(tap(responseData => {
           
            console.log(responseData);
            this.handleAuthenication(responseData.email, responseData.userId, responseData.authToken, +responseData.expiresIn);
        }));; 





    }
 

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData')
        if (this.tokenExpirationTImer) {
            clearTimeout(this.tokenExpirationTImer)
        }
        this.tokenExpirationTImer = null;
    }

    authLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const userLoaded = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpDate));
        if (userLoaded.token) {
            this.user.next(userLoaded);
            const expireInTime= new Date(userData._tokenExpDate).getTime()-new Date().getTime();
            this.autoLogout(expireInTime);
        }
    }

    autoLogout(expiresIn: number) {
        console.log(expiresIn);
        this.tokenExpirationTImer = setTimeout(() => {
            this.logout();
        }, expiresIn)

    }

/* 
    private handleError(errorResp: HttpErrorResponse) {
        this.errorMessage = "An unknow error occurred";
        if (!errorResp.error || !errorResp.error.error) {
            throwError(this.errorMessage);
        }
        switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
                this.errorMessage = 'This email already exists'
                break;
            case 'EMAIL_NOT_FOUND':
                this.errorMessage = 'This email doesnt exists'
                break;
            case 'INVALID_PASSWORD':
                this.errorMessage = 'The password is not valid'
                break;
        }
        return throwError(this.errorMessage);
    } */


    private handleAuthenication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem("userData", JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);
    }
}


