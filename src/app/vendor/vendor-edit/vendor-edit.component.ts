import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vendor } from '../vendor.class';
import { __importDefault } from 'tslib';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
  })
  export class VendorEditComponent implements OnInit {  
  
    vendor: Vendor = new Vendor();
    vendorid: number = 0;
    errorMessage = "";
    vendorForm: FormGroup = new FormGroup({});
  
  constructor(
      private vendorService: VendorService,
      private router: ActivatedRoute,
      private routes: Router
  
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
    
  
      this.vendorid = this.router.snapshot.params["id"]
  
      this.vendorService.getOne(this.vendorid).subscribe(
      {
          next: (data) => {
          this.vendor = data;
          
          this.vendorForm.patchValue(this.vendor);
          },
          error: (e: any) => this.errorMessage = "Error: " + e
          
      }
      );
  }
  
  onSubmit() {
  
      if (this.vendorForm.invalid) {
      this.errorMessage = "Form is invalid! ";
      this.errorMessage += this.vendorForm.errors;
      
      return;
      }  
      
      const updatedVendor = {
      ... this.vendor,
      ... this.vendorForm.value
      }  
      
      this.vendorService.updateData(updatedVendor, this.vendor.id).subscribe(
      {
          next: (data) => {
          
          this.vendor = data,
              this.routes.navigateByUrl("/vendor-list");
          },
          error: (e: any) => this.errorMessage = "Error: " + e,
          
      }
      );
  }
  }
 

