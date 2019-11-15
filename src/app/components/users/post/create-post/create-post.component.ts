import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MediaManagerComponent } from '../../media-manager/media-manager.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  spin;
  constructor(
    private dialog: MatDialog
    
  ) { }

  ngOnInit() {
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
