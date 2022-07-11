import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from '../request.class';
import { __importDefault } from 'tslib';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { User } from 'src/app/user/user.class';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request! : UserRequest;

  requestForm: FormGroup = new FormGroup({});

  isError = "";

  currentUser : User;
  

  constructor(  
    private requestService: RequestService,
    private systemService: SystemService,
    private router: Router,
    
    ) { this.currentUser = systemService.currentUser; }

  ngOnInit(): void {

    
    this.requestForm = new FormGroup(
      {
          description: new FormControl("", 
          [ Validators.required, 
            Validators.maxLength(230)
          ]),
      
          justification: new FormControl("", 
          [ Validators.required, 
            Validators.maxLength(130)
          ]),
    
          // rejectionReason: new FormControl(this.request.rejectionReason, 
          // [ Validators.required, 
          //   Validators.maxLength(230)
          // ]),
    
          deliveryMode: new FormControl("Pickup", 
          [ Validators.required, 
            Validators.maxLength(30)
          ]),
    
          // status: new FormControl(this.request.status, 
          // [ 
          //   Validators.required,
          //   Validators.maxLength(30)
          // ]),
    
          // total: new FormControl(this.request.total, 
          // [ 
          //   Validators.required, 
          //   Validators.maxLength(30)
          // ]),
    
          userId: new FormControl(this.systemService.currentUser.id, 
            [ Validators.required,
              Validators.maxLength(30)
            ]),
    
          // user: new FormControl(this.systemService.currentUser.username, 
          //   [ 
          //     Validators.required, 
          //     Validators.maxLength(30)
          //   ])      
    
    })
    }

  onSubmit() {
    if (this.requestForm.invalid) {
            return;
    }
    
    const newRequest = {
      ... this.request,
      ... this.requestForm.value
    }
           
    this.requestService.postData(newRequest).subscribe(
      resp => {
        this.request = resp as UserRequest;        
        this.router.navigateByUrl("/request-list");},
        err => {console.log(err);}  // probably should let the user know!
    );

  }

}

