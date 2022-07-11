import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup = new FormGroup({});

  currentUser : User;

  errormsg : string ="";

  constructor
  (
    private systemService : SystemService,
    private userService : UserService,
    private router: Router
  ) 
  { 
    systemService.currentUser = new User;
    this.currentUser = systemService.currentUser;
  }

  ngOnInit(): void {
    this.systemService.logout();
    this.userLoginForm = new FormGroup(
    {
      username: new FormControl("paul",
      [
        Validators.required,
        Validators.maxLength(30)
      ]),
      password: new FormControl("pass",
      [
        Validators.required,
        Validators.maxLength(30)
      ])
      
    })

  }

  login(){
    const newUserLogin={
      ... this.currentUser,
      ... this.userLoginForm.value
    }
    
    this.userService.loginUser(newUserLogin.username, newUserLogin.password).subscribe(
      resp => {
        
        
        this.systemService.login(resp as User)
        this.router.navigateByUrl("/home");},
        err => {console.log(err); this.errormsg="Invalid login!"}
    );
    
  }

}
