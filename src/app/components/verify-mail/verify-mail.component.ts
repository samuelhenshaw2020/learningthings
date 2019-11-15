import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { interval } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.css']
})
export class VerifyMailComponent implements OnInit, AfterContentInit {
  isVerifymail = true;
  count ;
  ifSent = true;
  initSent: boolean = false;
  resent: boolean = false;
  submitted: boolean = false;
  name = '';
  TOKEN_TIME = 2;
  message = ''
 
  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private route: Router,
    private snackbar: MatSnackBar
  ) { 
    
      
  }

  snackbarConfig: MatSnackBarConfig<any> = {
    panelClass: ['mb-5', 'bg-primary']
  }

  verifyTokenForm = this.fb.group({
    otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  get otp(){return this.verifyTokenForm.get('otp')};


  ngOnInit() {
    this.count = this.TOKEN_TIME;
    let count = interval(1000);
    count.subscribe(async e =>{
      if(this.count > 0){
       await this.count--;
      }else{
        this.count = 0;
        this.ifSent = false
      }
    });

  

    
  }

  ngAfterContentInit(){
    this.service.getName().subscribe(name => {
      console.log(name);
      this.name = name.name;
    })
  }


  Send(){
    this.ifSent = true;
    this.count = this.TOKEN_TIME;
    this.service.getOTP().subscribe(res => {
      console.log(res);
      // this.message = res.message;
      this.snackbar.open(res.message, 'close', this.snackbarConfig);
    })

  }


  verifyToken(){
    this.submitted = true;
    
    this.service.PostVerifyToken(this.verifyTokenForm.value).subscribe(res =>{
      this.submitted = false;
      console.log(res);
      if(res.success === true){
        this.route.navigate(['/dash']);
      }

      this.snackbar.open(res.message, 'close', this.snackbarConfig);

    },
    err => {
      this.submitted = false;
    }
      );
  }
 

}
