import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

product! : Product;
productid : number =0;


  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productid = this.router.snapshot.params["id"]
    this.productService.getOne(this.productid).subscribe(
      resp => {this.product = resp as Product;},
      err => {console.log(err);}
    );
  }

}
