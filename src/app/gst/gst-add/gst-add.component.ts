import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GSTService } from '../service/gst.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

 
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private gstService:GSTService,
    private route: ActivatedRoute,
    private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      person_name: ['', Validators.required ],
      business_name: ['', Validators.required ],
      business_gst_number: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  addBusiness(person_name, busines_name, business_gst_number) {
    this.gstService.addBusiness(person_name, busines_name, business_gst_number);
    this.router.navigateByUrl('business');
  }

}
