import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ThemeVariables, LyTheme2 } from '@alyle/ui';


const styles = (theme: ThemeVariables) => ({

  
})

@Component({
  selector: 'app-float-menu',
  templateUrl: './float-menu.component.html',
  styleUrls: ['./float-menu.component.css']
})
export class FloatMenuComponent implements OnInit {

  classes = this._theme.addStyleSheet(styles);

  show = false;
  form = {};
  submited = false;
  data = new FormData();
  responseback = false;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private _theme: LyTheme2
    ) { }

  commentForm = this.fb.group({
    mail: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
    message: ['', [Validators.required]]
  });

  get mail(){return this.commentForm.get('mail');}
  get message(){return this.commentForm.get('message');}

  showDialog(): void{
    this.show = !this.show;
  }

  ngOnInit() {
  }

  // sendComment(){
  //   this.submited = true;  
    
  //   if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/.test(this.mail.value)){
  //     this.service.addComments(this.commentForm.value).subscribe((data)=>{
  //       this.data = data;
  //       this.submited = false;
  //         }   );
  //   }else{
  //     this.submited = false; 
  //     this.snackbar.open("Invalid field detected. Check your email!", 'close', {duration: 5000});
  //   }

  // }

}
