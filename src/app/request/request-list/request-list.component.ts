import { Component, OnInit } from '@angular/core';
import { UserRequest } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests : UserRequest[] = [];
  errorMessage = "";

  constructor(private requestService: RequestService ) { }

  ngOnInit(): void {

    this.requestService.listData().subscribe( 
      data => {
        this.requests = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}