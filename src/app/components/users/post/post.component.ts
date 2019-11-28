import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { PostService } from './post.service';
import { post_model } from './post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // blog_post = [];

  constructor(
    private serv: UserserviceService,
    private postserv: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) { }

  
  ngOnInit() {
    this.fetchPost();
    this.fetchCategory()
  }

  async fetchPost(){
   await  this.route.data
    .subscribe(
        async data => {
      console.log(data.post)
     await  this.postserv.blogall.next(data.post);
      // if(data){
        this.postserv.isPost = true;
  
      
    },
    err => {
    
        this.snackbar.open('Operation failed! Please try again or contact admin via Support. Thanks', 'close', {duration: 8000}) 
      
    }
    
    )


    
  }

  
  public fetchCategory(){
     this.serv.postPostCategory()
    .subscribe(  async data => {
      console.log(data)
     await  this.postserv.category.next(data);
 
    })

  }

}
