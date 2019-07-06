import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import Business from '../model/Business';
import { AppService } from 'src/app/app-services';

@Injectable({
  providedIn: 'root'
})
export class GSTService {
business:Business[];


  businessChanged=new Subject<Business[]>();
  uri = 'http://localhost:4000/business';

  constructor(private http: HttpClient,private appService:AppService) { }

  addBusiness(person_name, business_name, business_gst_number) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    console.log(obj);
    /* this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done')); */
      this.appService.postData('/business/add',null,obj).subscribe(res => console.log('Done'));

      this.getBusinesses();
 
    }

  getBusinesses() {
  
        return this.appService.fetchData('/business',null)/* .subscribe((data:Business[])=>{
        console.log(" dsdsdss"+data);
          this.business=data;
        }); */
       // console.log(this.business);
      //  return this.business;

  }


  editBusiness(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
    

  }


  updateBusiness(person_name, business_name, business_gst_number, id) {

    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  // business.service.ts

  deleteBusiness(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

}
