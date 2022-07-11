import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.class';
import { __importDefault } from 'tslib';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product = new Product;

  productForm: FormGroup = new FormGroup({});

  errorMessage = "";

  vendors : Vendor[] = [];

  constructor(  
    private productService: ProductService,
    private vendorService : VendorService,
    private router: Router,
        ) { }           

  ngOnInit(): void {

    this.vendorService.listData().subscribe( 
      {
          next: (data) => this.vendors = data, 
          error: (e: any) => this.errorMessage = e          
      }
      );

    this.productForm = new FormGroup(
      {
          partNbr: new FormControl(this.product.partNbr, 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),
      
          name: new FormControl(this.product.name, 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),

          price: new FormControl(this.product.price, 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),
  
          unit: new FormControl(this.product.unit, 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),
    
          photoPath: new FormControl(this.product.photoPath, 
          [ 
            Validators.maxLength(30)
          ]),

          vendorId: new FormControl(this.product.vendorId, 
            [ 
              Validators.maxLength(30)
            ])

         

    })
  }

  onSubmit() {
    if (this.productForm.invalid) {
        return;
    }
    
    const newProduct = {
      ... this.product,
      ... this.productForm.value
    }
    
    this.productService.postData(newProduct).subscribe(
      resp => {
        this.product = resp as Product;
        
        this.router.navigateByUrl("/product-list");},
        err => {console.log(err);}  
    );

  }

}




