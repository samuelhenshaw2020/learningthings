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
        console.log(res)
        if (res.success == true) {
           localStorage.setItem('_token', res.token);
            if(res.comfirmation === 1){
              this.router.navigate(['/users']);
            }else{
              this.router.navigate(['/login/verify']);
            }

        } 
        await this.snackbar.open(res.message, 'close');
      },
      async  err => {
        console.log(err)
        this.submitted = false;
      }
    )
  }




}
