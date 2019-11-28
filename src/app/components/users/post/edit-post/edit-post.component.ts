import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { map, filter, takeWhile } from 'rxjs/operators';
import { post_model } from '../post.model';
import { from } from 'rxjs';
import { MediaManagerComponent } from '../../media-manager/media-manager.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserserviceService } from 'src/app/services/userservice.service';
import { HttpProgressEvent, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  
  post_content = [{}];
  imglink ;
  isUpdating = false;
  isDeleting = false;
  currentPage;
  sug_categories =[]
  

  constructor(
    private postServ: PostService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private serv: UserserviceService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
     
   }


  ngOnInit() {

this.currentPage = this.postServ.blogall.value.current_page;
   let param = this.activeRoute.snapshot.paramMap.get('post_id');
   
    if(this.postServ.isPost){

      this.postServ.blogall.subscribe(d=>{
     
        if(d){
          let  post: any[] = d.data;
          this.post_content = post.filter((po: post_model) => {
            return po.post_id == Number(param);
          })
        }
  
        if(this.post_content){
          let li = this.post_content.map((d: post_model)=>{
            return d.featured_image ;
          })
          // localStorage.setItem('_pst', Object(this.post_content));
          this.imglink = li[0]
          console.log(this.imglink)
        }
     },
     err=>{},
     ()=>{
     
     })

    }

    this.postServ.category.subscribe(d => {
      this.sug_categories = d.categories;
      console.log(this.sug_categories)
    })

    
    

  }

  updatePost(){
    
    this.isUpdating = true;
    console.log(this.post_content);
    let newData;
    let strImg = this.imglink.substr(this.imglink.search('images'), this.imglink.length);
    // console.log(strImg.trim());
    this.post_content.filter((d: post_model) => {
      newData = {
        post_title: d.post_title,
        post_body: d.post_body,
        post_id: d.post_id,
        category: d.category,
        featured_image: strImg
      }
    })

    
     this.serv.postUpdatePost(newData).subscribe(
       async (res)=>{
        if(res.success = true){
         this.fetch(this.currentPage)
        // this.postServ.blogall.
        }
        this.isUpdating = false;
         console.log(res)
         
       },
       (err)=>{},
       ()=>{}
     )
  }

  fetch(pageNo){
    this.isUpdating = true;
    let headerOption = {
      params: {
        'page': String(pageNo)
      }
    }
    this.serv.getAllPost(headerOption).subscribe(d=>{
      this.postServ.blogall.next(d);
     
      console.log(d);
      // window.location.href = "dash/post/all#table";
      this.isUpdating = false;
      this.snackbar.open("successful",'close')
    })
  }


  deletePost(){
    this.isDeleting = true;

    let newData;

    // console.log(strImg.trim());
    this.post_content.filter((d: post_model) => {
      newData = {
        post_id: d.post_id,
      }
    })

    this.serv.postDeletePost(newData.post_id).subscribe(
      (res)=>{
        this.isDeleting = false;
        console.log(res)
        this.router.navigate(['/dash/post/all']);
      
      },
      (err)=>{},
      ()=>{}
    )
  }


  openMedia(){
    const dialogRef = this.dialog.open(MediaManagerComponent, {
      minWidth: '90%',
      minHeight: "500px",
      maxHeight: "500px",
      disableClose: true
    });

    // console.log(el)
      dialogRef.afterClosed().subscribe(link => {
        // console.log(link);
        // this.imglink = link;
       if(link != undefined){
        this.imglink = link.substr(link.search('images'), link.length);;
       }
      })

  }


   /**********************************
   * The config for the angular editor
   ***********************************/
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '250px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: '',
    sanitize: true,
    toolbarPosition: 'top',
};


}
