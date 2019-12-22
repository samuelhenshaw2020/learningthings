import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { tap } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { inject } from '@angular/core/testing';

interface DialogData{
  email: string | string[] | any
  task: string 
}

@Component({
  selector: 'app-admin-mail',
  templateUrl: './admin-mail.component.html',
  styleUrls: ['./admin-mail.component.css']
})
export class AdminMailComponent implements OnInit {

  progress = 1 ;
  color = 'warn';
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits = [
    
  ];

  constructor(
    private dialogRef: MatDialogRef<AdminMailComponent>,
    private fb: FormBuilder,
    private adminServ: AdminserviceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  mailFG = this.fb.group({
    to: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    body: ['', [Validators.required]]
  })

  get to(){return this.mailFG.get('to')}
  get subject(){return this.mailFG.get('subject')}
  get body(){return this.mailFG.get('body')}

  ngOnInit() {
    if(this.data.task === '_target'){
      console.log(this.data.email)
      this.fruits.push(this.data.email)
    }
  }

  
  closeDialog(){
    this.dialogRef.close(); 
  }

  sendMail(){
    this.submitted = true;
    this.adminServ.send_email(this.mailFG.value)
    .pipe(
      tap(d => {
        this.progress = d.type * 25;        
        if(d.type === 0){this.color = 'accent'}
        if(d.type === 1){this.color = 'accent'}
        if(d.type === 2){this.color = 'accent'}
        if(d.type === 3){this.color = 'primary'}
        
      })
    )
    .subscribe(d => {
      if(d.type === 4){
        console.log(d)
        this.submitted = false;
      }
    },
    err => {
      console.log(err)
    })
  }





  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
