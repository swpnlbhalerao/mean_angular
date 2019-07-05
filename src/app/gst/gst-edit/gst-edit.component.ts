import { Component, OnInit } from '@angular/core';
import { GSTService } from '../service/gst.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {


  business: any = {};
  angForm: FormGroup;

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
    this.route.params.subscribe(params => {
      this.gstService.editBusiness(params['id']).subscribe(res => {
        this.business = res;
      });
    });
  }

  updateBusiness(person_name, business_name, business_gst_number) {
    this.route.params.subscribe(params => {
      this.gstService.updateBusiness(person_name, business_name, business_gst_number, params['id']);
      this.router.navigate(['business']);
    });

  }
}

