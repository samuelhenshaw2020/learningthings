import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { fade } from 'src/app/animations/getstatedAnim';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
  animations: [fade]
})
export class RegComponent implements OnInit {



  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private snackbar: MatSnackBar
  ) { }

  formData = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  get name() { return this.formData.get('name') }
  get email() { return this.formData.get('email') }
  get tel() { return this.formData.get('tel') }
  get password() { return this.formData.get('password') }
  get confirmPassword() { return this.formData.get('confirmPassword') }

  submitted: boolean = false;

  ngOnInit() {
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
        if (res.status === 200) {
          //  this.router.navigate(['/dash']);
          await this.snackbar.open(res.message, 'close');
        } else {
          await this.snackbar.open(res.message, 'close');
        }

      },
      async  err => {
        await this.snackbar.open(err, 'close');
        this.submitted = false;
      }
    )
  }

}
