import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';
    import { Product } from 'src/app/product/product.class';
    import { ProductService } from 'src/app/product/product.service';
    import { Requestline } from 'src/app/requestline/requestline.class';
    import { UserRequest } from '../request.class';
    import { RequestService } from '../request.service';

    @Component({
    selector: 'app-request-detail',
    templateUrl: './request-detail.component.html',
    styleUrls: ['./request-detail.component.css']
    })
    export class RequestDetailComponent implements OnInit {

    request! : UserRequest;
    requestlines : Requestline[] = [];
    products : Product[] = [];

    requestid = 0;
    reviewmode = "";
    errorMessage = "";

    constructor(
        private requestService: RequestService,
        private productService: ProductService,
        private router: ActivatedRoute ) { }

    ngOnInit(): void {

        this.requestid = this.router.snapshot.params["id"];
        this.reviewmode = this.router.snapshot.params["mode"];

        // get the request (with the user and request lines)
        this.requestService.getOne(this.requestid).subscribe( 
        data => {
          this.request = data;
         
            this.requestlines = data.requestLines;
          
            this.getProducts();


        },
        error => {
            this.errorMessage = error;
        }
        );
    }

    getProducts()
    {
        this.productService.listData().subscribe( 
        data => {
            this.products = data;
        },
        error => {
            this.errorMessage = error;
        }
        )
    }

    getaproductname(id:number)
    {
        return this.products.find(p => p.id == id)?.name;
    }

    getaproductprice(id:number)
    {
        let p = this.products.find(p => p.id == id)?.price;
        if (p == undefined) p=0;
        return p;
    }

    }


