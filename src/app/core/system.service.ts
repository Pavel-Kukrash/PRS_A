import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user.class';

@Injectable({
    providedIn: 'root'
})

export class SystemService {

    currentUser : User;

    constructor(private router: Router)
    {
        this.currentUser = new User();

        
    }

login(user: User){
    this.currentUser = user;
    //this.router.navigate(['/home']);
};
logout(){};

}