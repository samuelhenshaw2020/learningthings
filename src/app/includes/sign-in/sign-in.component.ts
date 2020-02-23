import { Component, OnInit, NgZone, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Router, ResolveStart } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PwdForgetComponent } from 'src/app/dialogs/pwd-forget.component';
import { GoogleLoginProvider, AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { HomeService } from 'src/app/services/home.service';
import { timer } from 'rxjs';
import { AdminService } from 'src/app/components/admin/admin.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide: boolean = true;
  submitted: boolean = false;
  goStatus: boolean = false;
  fbStatus:boolean = false;
  night;
  height = window.innerHeight + 'px';


  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private socAuth: AuthService,
    private homeServ: HomeService,
    private nightMode: AdminService
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
    this.nightMode.night.subscribe(d => {
      this.night = d
    })
  }

 

  //normal signin
  submitForm() {
    this.submitted = true;
    // this.snackbar.open("Authenticating User", '',{duration:4000, panelClass: ['bg-light', 'text-dark']});

    if(this.email.value === '' || this.email.value === null || this.email.value === undefined || this.email.invalid){
      this.snackbar.open("Email field invalid", 'close');
      return this.submitted = false;;
    }

    if(this.password.value === '' || this.password.value === null || this.password.value === undefined || this.password.invalid){
      this.snackbar.open("Password field invalid", 'close');
      return this.submitted = false;;
    }

    this.service.postSignin(this.formData.value).subscribe(
      async (res: any) => {
        this.submitted = false;
        this.snackbar.open(res.message, 'close', {duration: 5000, panelClass: ['bg-light', 'text-primary']})
        if (res.success == true) {
          //  localStorage.setItem('_token', res.token);
           this.homeServ.handle(res.token);
           console.log(res.confirmation)
            if(res.confirmation === 1){
              await this.snackbar.open(res.message, 'close', {duration: 4000,panelClass: ['bg-light', 'text-primary', 'font-weight-bold']});
              this.router.navigate(['/dash']);
            }else{
              await this.snackbar.open( "Verify Email account!", 'close');
              this.router.navigate(['/verify']);
            }

        }
      },
      async  err => {
        this.snackbar.open("Coult not authenticate user please contact admin!", 'close', {duration: 5000, panelClass: ['bg-light', 'text-primary']})
        this.submitted = false;
      }
    )
  }

  facebookLogin() {
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


  //google login
  googleSignin(){
    this.goStatus = true;
    this.ngZone.runOutsideAngular(()=>{
      this.socAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(
        gdata => {
          this.homeServ.googleSocialLogin(gdata.idToken).subscribe(
            async dat => {
              if (!dat.success && dat.success !== undefined) {
                this.ngZone.run(async _=>{
                  this.snackbar.open(dat.message, 'Close', { duration: 4000 });
                  await this.signOut();
                })
              }

              if (dat.success && dat.success !== undefined && dat.success !== null) {
                this.snackbar.open(dat.message, 'Close', { duration: 4000 });
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
          })
        }
      )
      .catch(console.error)
    })
  }



  signOut(): void {
    this.socAuth.signOut();

  }


  prevent($event: MouseEvent){
    $event.preventDefault();
  }
 




}
