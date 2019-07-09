import { Component, OnInit, OnDestroy } from '@angular/core';
import Business from '../model/Business';
import { GSTService } from '../service/gst.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit,OnDestroy {



  businesses: Business[];
  subs:Subscription;
  errorMessage:string='';

  constructor(private gstService: GSTService) {

  }

  ngOnInit() {

    this.getBusiness();

   /*  this.gstService.businessData$.subscribe((data: Business[]) => {
      console.log(" business Data Observalble " + data);
      this.businesses = data;
    })*/
  } 

  deleteBusiness(id) {
    this.gstService.deleteBusiness(id).subscribe(res => {
       this.getBusiness();
      console.log('Deleted');
    });
  }

 getBusiness() {
  
    this.subs = this.gstService.getBusinesses().subscribe((data: Business[]) => {
      console.log(" Business data service call from get component");
      this.businesses = data;
    },error=>{
      this.errorMessage=error
    });
  
  } 

ngOnDestroy(){
  this.subs.unsubscribe();
}

}
