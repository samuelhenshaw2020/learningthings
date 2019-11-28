import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MediaManagerComponent } from '../../media-manager/media-manager.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserserviceService } from 'src/app/services/userservice.service';
import { FormBuilder } from '@angular/forms';
import { identity_model, social_model, vission, mission, about } from '../web.model';





@Component({
  selector: 'app-web-identity',
  templateUrl: './web-identity.component.html',
  styleUrls: ['./web-identity.component.css']
})
export class WebIdentityComponent implements OnInit, AfterContentInit{

  submitted = false;
  social_media = true;
  imglink;
  logolink = null;
  
  

  isEditTitle = false;

  /**********************
   *for the NgModel
   ***********************/
  // hd_title =null;
  vission: vission = {
      enabled: null,
      vission: ''
  };
  mission: mission = {
    enabled: null,
    mission: ''
  };
  head_title = null;
  business_name = null;
  // facebook: social_model = null;
  // twitter: social_model = null;
  // linkedin: social_model = null;
  // pinterest: social_model = null;
  // youtube: social_model = null;
  // instagram: social_model = null;
  about: about = {
    enabled: null,
    about: ''
   
  };
  socialMedia = {
    enabled: null,
    handles: []
  };
  
  imgbaseUrl;
  
   

  constructor(
    private dialog: MatDialog,
    private serv: UserserviceService,
    private snackbar: MatSnackBar
  ) { 
   this.imgbaseUrl = this.serv.baseImgUrl;
  }





  ngOnInit() {
    
    
    this.serv.siteData.subscribe((data:identity_model) => {
      // console.log(data);
      let info = data;
      // console.log(data.site_data.logo)
      this.logolink = info.logo;
      this.head_title = info.header_title;
      this.imglink = info.header_image;
      
      
      this.vission = info.vission;
      // console.log(this.vission)
      this.mission = info.mission;
      this.socialMedia = info.social_media;
      this.about = info.about;
      this.business_name = info.business_name;
    });

    
   
  }

  ngAfterContentInit(){
    
   
  }

  save_site_data(){
    this.submitted = true;
    let newData: identity_model = {
      // site_data: {
        about: {
            enabled: this.about.enabled,
            about: this.about.about
        },
        business_name: this.business_name,
        color: this.serv.siteData.value.color,
        contact: {
            address: this.serv.siteData.value.contact.address,
            email: this.serv.siteData.value.contact.email,
            enabled: this.serv.siteData.value.contact.enabled,
            phone: this.serv.siteData.value.contact.phone
        },
        description: this.serv.siteData.value.description,
        gallery: {
            enabled: this.serv.siteData.value.gallery.enabled,
            gallery: this.serv.siteData.value.gallery.gallery
        },
        header_image:  this.imglink,
        header_title: this.head_title,
        link: this.serv.siteData.value.link,
        logo:  this.logolink,
        mission: {
            enabled:  this.mission.enabled ,
            mission: this.mission.mission
           
        },
        portfolio: {
            description:  this.serv.siteData.value.portfolio.description,
            image: this.serv.siteData.value.portfolio.image,
            profile: this.serv.siteData.value.portfolio.profile,
            skills: this.serv.siteData.value.portfolio.skills
    
        },
        service: {
            enabled: this.serv.siteData.value.service.enabled,
            services: this.serv.siteData.value.service.services
        },
        short: this.serv.siteData.value.short,
        site_id: this.serv.siteData.value.site_id,
        social_media: {
            enabled: this.socialMedia.enabled,
            handles: this.socialMedia.handles
        },
        template_id: this.serv.siteData.value.template_id,
        user_id: this.serv.siteData.value.user_id,
        vission: {
            enabled: this.vission.enabled,
            vission: this.vission.vission
    
        }
    
    
      //  }
    }
    // this.serv.siteData.next(newData);
    this.serv.postWebIdentityData(newData).subscribe((d) => {
      console.log(d);
      this.submitted = false;
      this.serv.siteData.next(d);
      this.snackbar.open("Data saved Successfully!", '', {
        panelClass: ["bg-white", "text-dark"],
        duration: 4000
      })
    }, err=>{
      this.submitted = false;
      this.snackbar.open("An error occured!", " close", {duration: 4000})
    })
    
  }




 
  openMedia(el, index?){
    const dialogRef = this.dialog.open(MediaManagerComponent, {
      minWidth: '90%',
      minHeight: "500px",
      maxHeight: "500px",
      disableClose: true
    });

    // console.log(el)
      dialogRef.afterClosed().subscribe(link => {
        console.log(link);
        
       if(link != undefined){

         if(index ===0 ){
          this.logolink = link.substr(link.search('images'), link.length);
         }


         if(index ===1){
           this.imglink = link.substr(link.search('images'), link.length);
         }
         
       }
      })




  
  }

  // stripedImg(val){
  //   return val.value.substr(val.value.search('images'), val.value.length)
  // }



  
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
 