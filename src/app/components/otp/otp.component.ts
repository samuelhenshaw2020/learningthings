import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { PwdForgetComponent } from 'src/app/dialogs/pwd-forget.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  submitted :boolean = false;
  enableOTP: boolean = false;
  enablePwd: boolean = false;
  enableReqmail: boolean = true;

  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  /**for the Request for OTP: Email form */
  reqform = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get email(){return this.reqform.get('email')};

  // /**for OTP confirmation: OTP Form */
  otpform = this.fb.group({
    otpcode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]]
  });

  get otpcode(){return this.otpform.get('otpcode')};

  
  /**for Pwd reset: Form Form */
  pwdform = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(5)]]
  });

  get password(){return this.pwdform.get('password')};
  get password_confirmation(){return this.pwdform.get('password_confirmation')};

  ngOnInit() {
  }



  reqsend(){
    this.submitted = true;
    // this.service.postRequestOTP(this.reqform.value).subscribe(
    //  async  (res: any) =>{
    //     this.submitted = false;
    //     console.log(res);
    //     if(res.success  == true){
    //       this.enableReqmail = false;
    //       this.enableOTP = true;
    //     }

    //     await this.opendialog(res.message, res.success)

        
    
    //   },
    //   async err => {
    //     this.submitted = false;
    //     await this.opendialog(err)
    //   }
    // );
  }


  otpvalidate(){
    this.submitted = true;
    this.service.postValidateOTP(this.otpform.value).subscribe(
     async  (res: any) =>{
        this.submitted = false;
        console.log(res);
        if(res.success === true){
          this.enableOTP = false;
          this.enablePwd = true;
        }

        await this.opendialog(res.message, res.success)

        

       
    
      },
      async err => {
        this.submitted = false;
        await this.opendialog(err)
      }
    );
  }


  pwdReset(){
    this.submitted = true;
    // console.log(this.pwdForm.value)
    this.service.postResetPWD(this.pwdform.value).subscribe(
     async  (res: any) =>{
        this.submitted = false;
        console.log(res);
        if(res.success === true){
          this.router.navigate(['/login/signin']);
        }

        await this.opendialog(res.message, res.success)
    
      },
      async err => {
        this.submitted = false;
        await this.opendialog(err)
      }
    );
  }



  opendialog(val1, val2?){
    this.dialog.open(PwdForgetComponent, {
      data: {msg: val1, success: val2}
      
    });
  }

}
