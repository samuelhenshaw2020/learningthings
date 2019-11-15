import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MediaManagerComponent } from '../../media-manager/media-manager.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-web-identity',
  templateUrl: './web-identity.component.html',
  styleUrls: ['./web-identity.component.css']
})
export class WebIdentityComponent implements OnInit, AfterContentInit, AfterViewInit{

  vision_check = true;
  mission_check = true;
   

  constructor(
    private dialog: MatDialog,
    private serv: UserserviceService
    
  ) { }

  ngOnInit() {
      console.log()
  }

  ngAfterContentInit(){
   
  }

  ngAfterViewInit(){
    // (this.serv.usersiteinfo as Subject<any>[]).success = false;
    // console.log(this.serv.usersiteinfo.success);
  }

  nav_menu = [
    {menu: 'Home', active: true},
    {menu: 'Gallary', active: true},
    {menu: 'About', active: true},
    {menu: 'COntact', active: true}
    // {menu: '', active: true}
  ]

  imglink;
  openMedia(s){
    const dialogRef = this.dialog.open(MediaManagerComponent, {
      minWidth: '90%',
      minHeight: "500px",
      maxHeight: "500px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(link => {
      console.log(link);
      this.imglink = link;
      s.src = link;
    })
  }

  logoimg: FileReader;
  logospin: Boolean = false;
  @ViewChild('display', {static: false}) display: ElementRef;
  async showImageProperty($event) {

    let display = $event.target.files[0];
    let regex: RegExp = /\.(jpe?g|png|gif|svg)$/i;

    if ($event.target.value.length > 0) {
      if (regex.test(display.name)) {
        this.logoimg = new FileReader();

        this.logoimg.onloadstart = () => {
          this.logospin = true;
        }

        this.logoimg.onloadend = async () => {
          this.logospin = false;
          this.display.nativeElement.src = this.logoimg.result;
          // await this.data.append('logoname', display);
        }
        await this.logoimg.readAsDataURL($event.target.files[0]);

      } else {
        // await this.snackbar.open(`${display.type} is not type JPG|PNG|JPEG|SVG `, "Close")
      }
    } else {
      // await this.snackbar.open(`Logo not selected. NEXT below to skip `, "Close")
    }


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
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
};



}
 