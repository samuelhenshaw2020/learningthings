import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MediaManagerComponent } from '../../media-manager/media-manager.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserserviceService } from 'src/app/services/userservice.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from '../post.service';
// import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  spin;
  sug_categories = [];
  cat = new FormControl();
  constructor(
    private dialog: MatDialog,
    private serv: UserserviceService,
    private fb: FormBuilder,
    private postServ: PostService
    
  ) { }

  createpostFG = this.fb.group({
    featured_image:['', [Validators.required]],
    title: ['', [Validators.required]],
    content: ['',[Validators.required]],
    category: ['',[]]
  })

  get featured_image(){return this.createpostFG.get('featured_image')}
  get title(){return this.createpostFG.get('title')}
  get content(){return this.createpostFG.get('content')}
  get category(){return this.createpostFG.get('category')}


  ngOnInit() {
    this.postServ.category.subscribe(d => {
      this.sug_categories = d.categories;
      console.log(this.sug_categories)
    })
  }

  imglink = null;
  openMediaManager(){
    this.spin = true;
    const dialogRef = this.dialog.open(MediaManagerComponent, {
      minWidth: '90%',
      minHeight: "500px",
      maxHeight: "500px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(link => {
      this.spin = false;
      console.log(link);
      this.imglink = link;
      this.featured_image.setValue(link);
    })
  }


  submitted= false;
  createPost(){
  
    let newPost = {
      featured_image:  this.featured_image.value.substr(this.featured_image.value.search('images'), this.featured_image.value.length),
      post_title: this.title.value,
      post_body: this.content.value,
      site_id: this.serv.siteData.value.site_id,
      category: this.category.value
    }

    this.submitted = true;
    this.serv.postCreatePost(newPost).subscribe(d=>{
      console.log(d);
      this.submitted = false;
      this.serv.getAllPost().subscribe(d=>{
        this.postServ.blogall.next(d)
        this.serv.postPostCategory()
        .subscribe(  async data => {
          console.log(data)
         await  this.postServ.category.next(data);
     
        })
        
    });
      
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
