import { Component, OnInit } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  errorMessage = "";

  constructor(private productService: ProductService ) { }

  ngOnInit(): void {

    this.productService.listData().subscribe( 
      data => {
        this.products = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}