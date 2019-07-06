import { Component, OnInit } from '@angular/core';
import Business from '../model/Business';
import { GSTService } from '../service/gst.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {



  businesses: Business[];

  constructor(private gstService: GSTService) { 

  }

  ngOnInit() {
  
  
      this.gstService.getBusinesses().subscribe((data:Business[])=>{
      console.log(" asdddddddddd"+data);
        this.businesses=data;
      });
  
    this.gstService.businessChanged.subscribe((data:Business[])=>{
    console.log(" asdddddddddd"+data);
      this.businesses=data;
    })
  }

  deleteBusiness(id) {
    this.gstService.deleteBusiness(id).subscribe(res => {
      //  this.getBusiness();
      console.log('Deleted');
    });
  }

  /* getBusiness() {
    this.gstService.getBusinesses().subscribe((data: Business[]) => {
      this.businesses = data;
    });
  } */



}
