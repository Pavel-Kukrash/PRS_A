import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { MenuItem } from '../menu-item.class';
import { Router} from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuitems : MenuItem[] = [];
  user = this.systemService.currentUser;
  isAdmin : boolean = this.user.isAdmin;
  isReviewer : boolean = this.user.isReviewer

  constructor(private systemService: SystemService,
              private router: Router) { }

  ngOnInit(): void {

    if (this.systemService.currentUser.id==0 )
    {
      this.router.navigate(["/user-login"])
    }
   
    this.menuitems = [
      new MenuItem("Home","/home", true),
      new MenuItem("Users","/user-list", true), // this.isAdmin || this.isReviewer),      
      new MenuItem("Vendors","/vendor-list", true), //this.isAdmin ),
      new MenuItem("Products","/product-list", true), //this.isAdmin ),
      new MenuItem("Requests","/request-list", true),
      new MenuItem("About","/about", true),
      new MenuItem("Logout","/user-login", this.systemService.currentUser.id!=0),
      
    ];


  }

}
