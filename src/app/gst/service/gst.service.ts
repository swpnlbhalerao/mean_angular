import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import Business from '../model/Business';
import { AppService } from 'src/app/app-services';

@Injectable({
  providedIn: 'root'
})
export class GSTService {
  business: Business[];
  private businessData = new Subject<Business[]>();
  public businessData$ = this.businessData.asObservable();


  constructor(private http: HttpClient, private appService: AppService) { }

  addBusiness(person_name, business_name, business_gst_number) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    console.log(obj);
    return this.appService.postData('/business/add', null, obj)/* .pipe(
      catchError(this.handleError)
    ); */
  }

  getBusinesses() {
    return this.appService.fetchData('/business', null)/* .pipe(
      catchError(this.handleError)
    ); */
  }


  editBusiness(id) {
    return this.appService.fetchData(`/business/edit/${id}`, null)/* .pipe(
      catchError(this.handleError)
    ); */
  }


  updateBusiness(person_name, business_name, business_gst_number, id) {

    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
   return  this.appService.postData(`/business/update/${id}`, null, obj)/* .pipe(
    catchError(this.handleError)
  );
    */
   
  
      
  }


  deleteBusiness(id) {
    return this.appService.fetchData(`/business/delete/${id}`, null) /* .pipe(
      catchError(this.handleError)
    ); */
  }

 /*  fetchBusiness() {
    this.getBusinesses().subscribe((data) => {
      console.log('Data From fetch business' + data);
    })
  } */

  setData(data) {
    this.businessData.next(data);
  }

/* 
    private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }; */


}
