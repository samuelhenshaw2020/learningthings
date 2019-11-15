import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PwdForgetComponent } from 'src/app/dialogs/pwd-forget.component';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide: boolean = true;
  submitted: boolean = false;




  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) { 
    
  }

  formData = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  get email() {
    return this.formData.get('email');
  }

  get password() {
    return this.formData.get('password');
  }

  ngOnInit() {
  }

  submitForm() {
    this.submitted = true;
    this.service.postSignin(this.formData.value).subscribe(
      async (res: any) => {
        this.submitted = false;
        console.log(res.confirmation)
        if (res.success == true) {
           localStorage.setItem('_token', res.token);
           console.log(res.confirmation)
            if(res.confirmation === 1){
              await this.snackbar.open(res.message, 'close', {panelClass: ['bg-success', 'text-light', 'font-weight-bold']});
              this.router.navigate(['/dash']);
              
            }else{
              await this.snackbar.open( "Verify Email account!", 'close');
              this.router.navigate(['/login/verify']);
            }

        } 
        
      },
      async  err => {
        console.log(err)
        this.submitted = false;
      }
    )
  }




}
