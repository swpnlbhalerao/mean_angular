import { Component, OnInit } from '@angular/core';
import { GSTService } from '../service/gst.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {


  business: any = {};
  angForm: FormGroup;
  subs$  :Subscription
  editSubs$  :Subscription
  errorMessage:string=''; 
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private gstService: GSTService,
    private fb: FormBuilder) {
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
   this.editSubs$ = this.route.params.subscribe(params => {
      this.gstService.editBusiness(params['id']).subscribe(res => {
        this.business = res;
      },err=>{
        this.errorMessage=err;
        console.log('Error Sw  : '+err);
      });
    });
  }

  updateBusiness() {
    let  businessData =this.angForm.value;  
    this.route.params.subscribe(params => {
      console.log(params);
      this.gstService.updateBusiness(businessData.person_name,businessData.business_name, businessData.business_gst_number, params['id']) .subscribe(res =>{
         console.log('Done')
         this.router.navigateByUrl('business');
      }
      ,err=>{
        this.errorMessage=err;
        console.log('Error Sw  : '+err);
      });
     
    });

   






  }


  ngOnDestroy(){
  //  this.subs$.unsubscribe();
    this.editSubs$.unsubscribe();
      }
    


}

