import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User }  from '../user.class';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user! : User;
  userid : number =0;
  

  constructor(
    private userService: UserService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid = this.router.snapshot.params["id"]
    this.userService.getOne(this.userid).subscribe(
      resp => {this.user = resp as User;},
      err => {console.log(err);}
    );

    
  }

}
