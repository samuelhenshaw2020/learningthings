import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ControlValueAccessor } from "@angular/forms";
import { fade } from 'src/app/animations/getstatedAnim';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { RecaptchaCommonModule } from 'ng-recaptcha/recaptcha/recaptcha-common.module';
import { RecaptchaFormsModule, RecaptchaLoaderService } from 'ng-recaptcha';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
  animations: [fade]
})
export class RegComponent implements OnInit, OnDestroy {



  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private snackbar: MatSnackBar,
    private router: Router,
    private homeServ: HomeService
  ) {
    
   }

  formData = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password_confirmation: ['', [Validators.required]],
    recaptchaReactive: [ null, [Validators.required]]
  });

  get name() { return this.formData.get('name') }
  get email() { return this.formData.get('email') }
  get phone() { return this.formData.get('phone') }
  get password() { return this.formData.get('password') }
  get password_confirmation() { return this.formData.get('password_confirmation') }
  get recaptchaReactive(){return this.formData.get('recaptchaReactive')}

  submitted: boolean = false;
  sub;
  isRecaptcha = true;

  ngOnInit() {
    
  }

  ngOnDestroy(){
    let cond = window.confirm("Leave the screen. Unfinished registration!")
   
      this.router.dispose()
    
  }



  resolved(captchaResponse: string, res) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    
    this.sub =this.homeServ.recaptcha(captchaResponse).subscribe(
      d => {
        console.log(d)
        if(d.success){
          this.isRecaptcha = false
        }
      },
      err => {console.log(err)},
      ()=>{}
    )
  }

  

  scroToSm(): void {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  }

  submitForm() {
    this.submitted = true;
    this.service.postRegister(this.formData.value).subscribe(
      async (res: any) => {
        this.submitted = false;
        console.log(res);
        if (res.success === true) {
           interval(2000).subscribe(()=>{
            this.router.navigate(['/login/signin']);
           })
          await this.snackbar.open(res.message, 'close');
        } else {
          await this.snackbar.open(res.message, 'close');
        }

      },
       err => {
         this.snackbar.open(err, 'close');
        this.submitted = false;
      }
    )
  }

}
