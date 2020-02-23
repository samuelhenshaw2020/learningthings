import { Component, OnInit } from '@angular/core';
import { MediaManagerComponent } from '../media-manager/media-manager.component';
import { MatDialog } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { from } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { profile_model } from '../post/post.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

interface port_st {
  description : string,
  image: string,
  profile: any,
  skills: any
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

 
  hover = false;
  formdata: FormData = new FormData();
  
  skills = [];
  experience_list = [];
  education_list = [];
  project_list = []
  description: string = '';
  profile: profile_model;
  imglink = null;
  imagebase;
  


  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private service: UserserviceService,
    private rootS: AppService,
    private router: Router
  ) { 
    this.imagebase = service.baseImgUrl;
    
  }

  portForm = this.fb.group({
    prof_img: ['', [Validators.required]],
    prof_name: ['', [Validators.required]],
    prof_desc: ['', [Validators.required]],
    prof_exp: ['', [Validators.required]]
  })

  get prof_img(){return this.portForm.get('prof_img')}
  get prof_name(){return this.portForm.get('prof_name')}
  get prof_desc(){return this.portForm.get('prof_desc')}
  get prof_exp(){return this.portForm.get('prof_exp')}

  ngOnInit() {
    this.service.siteData().subscribe((d:any) => {
      if(d.portfolio.profile !== null){
        this.profile = d.portfolio.profile;
        this.education_list = (d.portfolio.profile.education != undefined ? d.portfolio.profile.education : []);
        this.experience_list = (d.portfolio.profile.experience != undefined ? d.portfolio.profile.experience : []); 
        this.project_list = (d.portfolio.profile.project != undefined ? d.portfolio.profile.project : []); 
        this.description = d.portfolio.description;
        this.imglink = d.portfolio.image;
        this.skills = d.portfolio.skills;
      }
     
    })
    this.getNationality()

    // if(this.service.siteData().value.short !== 'ptf'){

    // }

  }



  nationality: any[];
  getNationality(){
    this.rootS.get_nationality().subscribe(
      nation => {
        this.nationality = nation;
      }
    );
  }

  pushSkill(val, rg){
    if(val != '' && rg!= ''){
      this.skills.push({value: val, range: rg});
      // console.log(this.skills)
    }
  }

 
  openMediaManager($event:MouseEvent){
    $event.preventDefault();
    const dialogRef = this.rootS.mediaBox();

    dialogRef.afterClosed().subscribe(link => {
      if(link != undefined){
        this.imglink = this.delURL(link);
      }
      console.log(link)
    })
  }

  experience(){
    this.rootS.experience().afterClosed().subscribe(
      data => {
      
          if(data.success == true){
            this.experience_list.unshift(data);
          }
        
        // console.log(data)
      }
    );
  }
  removeExp(i){
    this.experience_list.splice(i, 1);
  }
  trackExpBy(index, exp){
    return index;
  }

  education(){
    this.rootS.education().afterClosed().subscribe(
      data => {
        if(data.success === true){
          this.education_list.unshift(data)
        }
      }
    );
  }
  removeEdu(i){
    this.education_list.splice(i, 1);
  }
  trackEduBy(index, edu){
    return index;
  }

  project(){
    this.rootS.project().afterClosed().subscribe(
      data => {
        if(data.success === true){
          data['image']= ""
          this.project_list.push(data)
         
        }
      }
    );
  }
  removePro(i){
    this.project_list.splice(i, 1);
  }
  trackProBy(index, pro){
    return index;
  }

  remove(val): void {
      

      this.skills.splice(val, 1);
    
    // console.log(  )
  }


  change(i){
      
    this.rootS.mediaBox().afterClosed().subscribe(
      link => {
        if(link != undefined){
          this.project_list[i].image = this.delURL(link);
        }
      }
    );
  }




  // drag and drop 


  dropExperience(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.experience_list, event.previousIndex, event.currentIndex);
  }

  dropEducation(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.education_list, event.previousIndex, event.currentIndex);
  }

  dropProject(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.project_list, event.previousIndex, event.currentIndex);
  }

  dropSkills(event: CdkDragDrop<string[]>){
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }


  

  /**********************************
   *The portForm form on submit event
   ***********************************/
  sending = false;
   submitPort(){
    this.sending = true;
    
    this.profile['education'] = this.education_list
    this.profile['experience'] = this.experience_list
    this.profile['project'] = this.project_list

    let port: port_st = {
      profile: this.profile,
      skills: this.skills,
      image: this.delURL(this.imglink),
      description: this.description
    }

    this.service.siteData().value.portfolio = port;

    let newData = this.service.siteData().value
  //  console.log( )
    

    

    this.service.postWebIdentityData(newData).subscribe(
      res => {
        this.sending = false;
        

      }, 
      err => {
        this.sending = false;

      }
    );
    
    
  }


  delURL(img):string{
    return  img.substr(img.search('images'), img.length);
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
