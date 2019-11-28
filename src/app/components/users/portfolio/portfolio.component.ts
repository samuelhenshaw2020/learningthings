import { Component, OnInit } from '@angular/core';
import { MediaManagerComponent } from '../media-manager/media-manager.component';
import { MatDialog } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  skills = [];
  hover = false;
  formdata: FormData = new FormData();


  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private service: UserserviceService
  ) { }

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
    this.service.siteData.subscribe(d => {
      console.log(d.portfolio)
    })
  }

  pushSkill(val, rg){
    if(val != '' && rg!= ''){
      this.skills.push({value: val, range: rg});
      console.log(this.skills)
    }
  }

  imglink = null;
  openMediaManager(){
   
    const dialogRef = this.dialog.open(MediaManagerComponent, {
      minWidth: '90%',
      minHeight: "500px",
      maxHeight: "500px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(link => {
      console.log(link);
      this.imglink = link;
    })
  }

  remove(val): void {
    this.skills.splice(val, val+1)
  }

  /**********************************
   *The portForm form on submit event
   ***********************************/
  async submitPort(){
    this.formdata.append('prof_img', this.prof_img.value);
    this.formdata.append('prof_name', this.prof_name.value);
    this.formdata.append('prof_exp', this.prof_exp.value);
    this.formdata.append('prof_desc', this.prof_desc.value);
    this.formdata.append('prof_skills', Object(this.skills));
    this.service.postPortfolio(this.formdata).subscribe(data => {
      console.log(data)
    }, 
    err => {
      console.log(err)
    });
    
    
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
