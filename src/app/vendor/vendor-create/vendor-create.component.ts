import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vendor } from '../vendor.class';
import { __importDefault } from 'tslib';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  vendor = new Vendor;

  vendorForm: FormGroup = new FormGroup({});

  isError = "";

  constructor(  
    private vendorService: VendorService,
    private router: Router,
        ) { }      
        

  ngOnInit(): void {
    this.vendorForm = new FormGroup(
      {
          code: new FormControl(this.vendor.code, 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),
      
          name: new FormControl(this.vendor.name, 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),

          address: new FormControl(this.vendor.address, 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),
  
          city: new FormControl(this.vendor.city, 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),
    
          state: new FormControl(this.vendor.state, 
          [ 
            Validators.maxLength(30)
          ]),

          zip: new FormControl(this.vendor.zip, 
            [ 
              Validators.maxLength(30)
            ]),

          phone: new FormControl(this.vendor.phone, 
            [ 
              Validators.maxLength(30)
            ]),

          email: new FormControl(this.vendor.email, 
          [ Validators.email, 
            Validators.maxLength(30)
          ])     

    })
  }

  onSubmit() {
    if (this.vendorForm.invalid) {      
      return;
    }

    
    const newVendor = {
      ... this.vendor,
      ... this.vendorForm.value
    }

    
    this.vendorService.postData(newVendor).subscribe(
      resp => {
        this.vendor = resp as Vendor;
       
        this.router.navigateByUrl("/vendor-list");},
        err => {console.log(err);}  
    );

  }

}




