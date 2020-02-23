import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormBuilder, Validators, ControlValueAccessor } from "@angular/forms";
import { fade } from 'src/app/animations';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { interval, Observable, timer } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { RecaptchaCommonModule } from 'ng-recaptcha/recaptcha/recaptcha-common.module';
import { RecaptchaFormsModule, RecaptchaLoaderService } from 'ng-recaptcha';
import { GoogleLoginProvider, AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { BaseLoginProvider } from 'angularx-social-login/lib/entities/base-login-provider';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { AdminService } from 'src/app/components/admin/admin.service';






@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
  animations: [fade]
})
export class RegComponent implements OnInit, OnDestroy {

night;
hide = true;
height = window.innerHeight + 'px';

  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private snackbar: MatSnackBar,
    private router: Router,
    private homeServ: HomeService,
    private socAuth: AuthService,
    private http: HttpClient,
    private ngZone: NgZone,
    private nightMode: AdminService
  ) {

  }

  formData = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
    password: ['', [Validators.required]],
    password_confirmation: ['', [Validators.required]],
    recaptchaReactive: [null, [Validators.required]]
  });

  get name() { return this.formData.get('name') }
  get email() { return this.formData.get('email') }
  get phone() { return this.formData.get('phone') }
  get password() { return this.formData.get('password') }
  get password_confirmation() { return this.formData.get('password_confirmation') }
  get recaptchaReactive() { return this.formData.get('recaptchaReactive') }

  submitted: boolean = false;
  sub;
  isRecaptcha = true;
  private userData: SocialUser
  private loggedIn: boolean;

  ngOnInit() {
    this.socAuth.authState.subscribe((user) => {
      this.userData = user;
      this.loggedIn = (user != null);
      console.log(this.userData);
    });

    this.nightMode.night.subscribe(d => {
      this.night = d;
    })
    
  }

  ngOnDestroy() {
    // let cond = window.confirm("Leave the screen. Unfinished registration!")

    // this.router.dispose()

  }

 

  fbStatus = false;
  facebookSignup() {
    this.fbStatus = true;
    this.socAuth.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(
        fbdata => {
          console.log(fbdata)
          this.fbStatus = false;
          // this.router.navigate(['/admin'])

        },
        err => {
          console.log(err)
          this.fbStatus = false;
        })
      .catch(function (err) {
        console.log(err)
        this.fbStatus = false;
      }).finally(function(){
        
      });




  }

 goStatus = false;

  googleSignup() {
    this.goStatus = true;
    this.ngZone.runOutsideAngular(()=>{
      this.socAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(
        gdata => {
          this.homeServ.googleSocialSignup(gdata.idToken).subscribe(
            async dat => {
              if (!dat.success && dat.success !== undefined) {
                this.ngZone.run(async _=>{
                  this.snackbar.open(dat.message, 'Close', { duration: 4000 });
                  await this.signOut();
                })
              }

              if (dat.success && dat.success !== undefined && dat.success !== null) {
                 this.ngZone.run(()=>{
                  this.snackbar.open(dat.message + " Redirecting to signin...", 'Close', { duration: 4000 });
                 })
                // timer(4000).subscribe(t => {
                //   this.ngZone.run(async _=>{
                //    await this.router.navigate(["login/signin"])
                //   })
                // })
              }



            },
            err => {
              this.ngZone.run(_=>{
                console.log(err)
              })
            },
            () => {
              this.goStatus = false;
            }
          )
        },
        g_err => {
          this.ngZone.run(_=>{
            console.log(g_err)
            this.goStatus = false;
          })
        }
      )
      .catch(()=>{
        console.error;
        this.goStatus = false;
      })
      .finally(()=>{
        
      })

    })
  }

  signOut(): void {
    this.socAuth.signOut();

  }

  statusLog() {
    this.socAuth.authState.subscribe(d => {
      console.log(d)
    })

    this.socAuth.readyState.subscribe(d => {
      console.log(d)
    })


  }




  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);

    this.sub = this.homeServ.recaptcha(captchaResponse).subscribe(
      d => {
        console.log(d)
        if (d.success) {
          this.isRecaptcha = false
        }
      },
      err => { console.log(err) },
      () => { }
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
          interval(2000).subscribe(() => {
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
