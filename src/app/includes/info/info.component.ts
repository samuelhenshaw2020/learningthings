import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  show: boolean = false;
  submited: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  commentForm = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]]
  });

  get mail(){return this.commentForm.get('mail');}
  get message(){return this.commentForm.get('message');}

  ngOnInit() {
  }

  sendComment(){

  }

  showDialog(): void{
    this.show = !this.show;
  }

}
