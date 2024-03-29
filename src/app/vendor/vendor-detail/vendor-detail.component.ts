import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendor! : Vendor;
  vendorid : number =0;


  constructor(
    private vendorService: VendorService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.vendorid = this.router.snapshot.params["id"]
    this.vendorService.getOne(this.vendorid).subscribe(
      resp => {this.vendor = resp as Vendor;},
      err => {console.log(err);}
    );
  }

}
