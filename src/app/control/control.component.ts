import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminserviceService } from '../services/adminservice.service';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../app.service';
import { AdminService } from '../components/admin/admin.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  hide: boolean = true;
  submitted: boolean = false;
  display = "Admin Login";
  color = "bg-dark";
  night;
  height = window.innerHeight + 'px';

  constructor(
    private fb: FormBuilder,
    private adminServ: AdminserviceService,
    private snackbar: MatSnackBar,
    private router: Router,
    private nightMode: AdminService
  ) {
     
   }

  adminFG = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  get mail(){return this.adminFG.get('mail')}
  get password(){return this.adminFG.get('password')}
  

  ngOnInit() {
    this.nightMode.night.subscribe(d => {
        this.night = d;
    })
  }

  authenticate(){
      this.submitted = true;
    this.adminServ.Postlogin(this.adminFG.value)
    .pipe(
      tap((data:any)=>{
        if(data.type == 0){this.display = "Sending...", this.color = "bg-warning"}
        if(data.type === 1){this.display = "Processing..."; this.color = "bg-success"}
        if(data.type === 2){this.display = "Authenticating..."; this.color = "bg-success"}
        if(data.type === 3){this.display = "Responding..."; this.color = "bg-success"}
        if(data.type === 4){
         
            this.display = data.body.message;
          
           this.submitted = false; this.color = "bg-dark";
          
          }
      })
    )
    .subscribe( (data:any)=> {
      console.log((data))
     if(data.type === 4){
        if(data.body.success && data.body.success !== undefined && data.body.success !== null){
          localStorage.setItem('_token', data.body.token);
          this.router.navigate(["/admin"]);
        }

        

     }
        
    },
    
    (err: HttpErrorResponse) => {
     
       if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.snackbar.open(err.error.message, 'Close', {duration: 4000})
        }
       }
    
    
      this.display = "Error occured"
      console.log(err)
    }
    ,
    
      ()=>{
       this.submitted = false;
      }
      )
    
  }

  showPwd($event){
    this.hide = $event.target.checked;
  }

}
