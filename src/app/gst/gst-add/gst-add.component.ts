import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GSTService } from '../service/gst.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit,OnDestroy {


   angForm: FormGroup;
   private subs1$:Subscription
   errorMessage:string=''; 

  constructor(private fb: FormBuilder, private gstService: GSTService,
    private route: ActivatedRoute,
    private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      person_name: ['', Validators.required],
      business_name: ['', Validators.required],
      business_gst_number: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addBusiness() {
    let  businessData =this.angForm.value;

    console.log("bObj "+businessData);
     this.gstService.addBusiness(businessData.person_name,businessData.business_name, businessData.business_gst_number).subscribe((res) => {
      console.log('Done',res);
      this.router.navigateByUrl('business');

    },err=>{
      this.errorMessage=err;
      console.log('Error Sw  : '+err);
    }
    
    );
   
  }
 /*  submitForm(){
    console.log(this.angForm);
    console.log(this.angForm.value.person_name);
   let  business =this.angForm.value;
    console.log("bObj "+business.person_name);

 
  } */




  ngOnDestroy(){
  //this.subs1$.unsubscribe();
  }


}
