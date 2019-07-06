import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class AppService{


    private baseServerURL: string = '';
    private mockResponseDelay: number = 5000; // Delay in Milliseconds to get data from Mock json
    constructor(private httpClient: HttpClient) {
      this.baseServerURL = 'http://localhost:4000';
    }
  
    fetchData(endpoint: String, params: Object): Observable<any> {
      const apiUrl = this.baseServerURL + endpoint//+ this.apiMapping.appendParamsToUrl(endpoint, params);
      console.log(apiUrl);
      return this.httpClient.get(apiUrl);
    }
  
    postData(endpoint: String, params: Object, options: Object): Observable<any> {
     // const apiUrl = this.baseServerURL  //+ this.apiMapping.appendParamsToUrl(endpoint, params);
     const apiUrl = this.baseServerURL + endpoint//+ this.apiMapping.appendParamsToUrl(endpoint, params);
     console.log(apiUrl);
     return this.httpClient.post(apiUrl, options);
    }



}