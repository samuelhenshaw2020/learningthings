import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, } from '@angular/core';
import { fade } from 'src/app/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css'],
  animations: [fade]
})
export class GetStartedComponent implements OnInit, AfterContentInit {

  isLogPage: boolean = false;
  index;
  prev;
  prev2;
  logoimg: FileReader;
  @ViewChild('img', { static: false }) img: ElementRef;
  @ViewChild('form', { static: false }) form: ElementRef;
  @ViewChild('socmedia', { static: false }) socmedia: ElementRef;
  @ViewChild('nextbtn', { static: false }) nextbtn: ElementRef;
  START_COUNT: number = 1;
  END_COUNT: number = 8;
  count = this.START_COUNT;
  data: FormData = new FormData();
  submitted: boolean = false;
  templates = [];
  template_property;
  filterTemplate = [];

  imagebase = ''
 




  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UserserviceService,
    private snackbar: MatSnackBar,
    private sanitize: DomSanitizer,
    private activeRoute: ActivatedRoute
  ) { 
    this,this.imagebase = service.baseImgUrl;
  }

  /**
   * Validates the forms 
   */
  formData = this.fb.group({
    bizname: ['', [Validators.required]],
    bizdesc: ['', [Validators.required]],
    webtype: ['', [Validators.required]],
    logoname: ['', []],
    contactinfo: this.fb.group({
      bizmail: ['', [Validators.required, Validators.email]],
      biztel: ['', [Validators.required, Validators.minLength(11)]],
      bizaddress: ['', [Validators.required]]
    }),
    socialmedia: this.fb.group({
      smlinkedin: ['', []],
      smpint: ['', []],
      smyoutube: ['', []],
      sminstagram: ['', []],
      smtwitter: ['', []],
      smfacebook: ['', []],
    }),
    theme: ['', []],
    store_name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/[a-zA-Z0-9]/)]]
  });

  /**
   * @returns {string} the value of the Form elements
   */
  get bizname() { return this.formData.get('bizname') }
  get bizdesc() { return this.formData.get('bizdesc') }
  get webtype() { return this.formData.get('webtype') }
  get logoname() { return this.formData.get('logoname') }
  get bizmail() { return this.formData.get('contactinfo').get('bizmail') }
  get biztel() { return this.formData.get('contactinfo').get('biztel') }
  get bizaddress() { return this.formData.get('contactinfo').get('bizaddress') }
  get smlinkedin() { return this.formData.get('socialmedia').get('smlinkedin') }
  get smpint() { return this.formData.get("socialmedia").get('smpint') }
  get smyoutube() { return this.formData.get('socialmedia').get('smyoutube') }
  get sminstagram() { return this.formData.get('socialmedia').get('sminstagram') }
  get smtwitter() { return this.formData.get('socialmedia').get('smtwitter') }
  get smfacebook() { return this.formData.get('socialmedia').get('smfacebook') }
  get theme() { return this.formData.get('theme') }
  get store_name() { return this.formData.get('store_name')}


  businessCat: object[] = [
    { name: 'E-commerce', icon: "fa fa-shopping-cart fa-lg", type: 'ecommerce', short_name: 'cmc' },
    { name: 'Portfolio and CV', icon: "fa fa-address-card-o fa-lg", type: 'portfolio', short_name: 'ptf' },
    // { name: 'Education', icon: "		fa fa-graduation-cap fa-lg", type: 'blog', short_name: 'blg'},
    { name: 'Business', icon: "fa fa-bar-chart fa-lg" , type: 'portfolio', short_name: 'bis'},
    // { name: 'Photography and Media', icon: "	fa fa-camera fa-lg", type: 'blog', short_name: 'blg' },
    // { name: 'Entertainment', icon: "fa fa-video-camera fa-lg", type:'blog', short_name: 'blg' },
    
    { name: 'Blog', icon: "fa fa-book fa-lg", type: 'blog', short_name: 'blg' }

  ]
 
  ngOnInit() {

    if(!localStorage.getItem('_token')){
        console.log("there is no token")
        this.router.navigate(['/login'])
        this.snackbar.open("You have to login before creating a site!");
    }

    this.hideComponents(1);
    window.onkeyup = () => {
      this.restrictNext();
    }
  }

  ngAfterContentInit(){
    this.activeRoute.data.subscribe(
      temp =>{
      console.log(temp.temp)
      this.templates = temp.temp;
    }, 
    err =>{
      console.log(err)
    })
  }
  
  bindTemplate(val: any){
    this.filterTemplate = this.templates.filter(tem => {
      return tem.type === val;
    });
    console.log(this.filterTemplate);
  }

  setWebType(val:any){
    this.webtype.setValue(val); 
  }

  setTheme(tem: any){
    this.theme.setValue(tem);
  }


  /**
   * @param {Number} index - for selecting the theme and business type.
   * @author: Henshaw Samuel.
   */
  async colorate(index: any) {
    if (this.count == (this.START_COUNT + 5)) {
      this.prev2 = index;
    } else {
      this.prev = index;
    }
    await this.restrictNext()
  }


  /**
   * @param {Event} event- An onchange on logo select
   * Also shows the logo uploaded to the image View.
   * @author: Henshaw Samuel
   */
  logospin: boolean = false;
  async showImageProperty($event) {

    let img = $event.target.files[0];
    let regex: RegExp = /\.(jpe?g|png|gif|svg)$/i;

    if ($event.target.value.length > 0) {
      if (regex.test(img.name)) {
        this.logoimg = new FileReader();

        this.logoimg.onloadstart = () => {
          this.logospin = true;
        }

        this.logoimg.onloadend = async () => {
          this.logospin = false;
          this.img.nativeElement.src = this.logoimg.result;
          await this.data.set('logoname', img);
        }
        await this.logoimg.readAsDataURL($event.target.files[0]);

      } else {
        await this.snackbar.open(`${img.type} is not type JPG|PNG|JPEG|SVG `, "Close")
      }
    } else {
      await this.snackbar.open(`Logo not selected. NEXT below to skip `, "Close")
    }


  }


  /**
   * @param {number} value Hides the form component from view
   * Shows form component in view
   */
  hideComponents(value: any) {
    value = this.count;
    for (let a = 1; a <= document.getElementsByClassName('con').length; a++) {
      document.getElementById("comp" + a).style.display = "none";
    }
    document.getElementById("comp" + value).style.display = "inherit";
  }



  /**
   * Next, Back and Skips the form
   */
  async nextComp() {
    if (this.count < this.END_COUNT) {
      this.count++
    }
    await this.hideComponents(this.count);
    await this.restrictNext();
  }

  async backComp() {
    if (this.count != this.START_COUNT) {
      this.count--;
    }
    this.hideComponents(this.count);
    this.restrictNext();
  }

  async skipComp(value?) {
    if (this.count < this.END_COUNT) {
      this.count++
    }
    this.hideComponents(this.count);
    this.restrictNext();
  }

  /**
   * Restricts the next button for required fields
   */
  async restrictNext() {
    console.log(this.count)
    switch (this.count) {
      case (this.START_COUNT + 1):
        if (this.bizdesc.invalid) {
          (document.getElementById('nextbtn') as any).disabled = true;
        } else {
          (document.getElementById('nextbtn') as any).disabled = false;
        }
        break;
      case (this.START_COUNT + 2):
        if (this.prev == undefined) {
          (document.getElementById('nextbtn') as any).disabled = true;
          // (document.getElementById('skipbtn') as any).disabled = true;
        } else {
          (document.getElementById('nextbtn') as any).disabled = false;
          // (document.getElementById('skipbtn') as any).disabled = true;
        }
        break;
      case (this.START_COUNT + 3):
        if (this.logoname.invalid) {
          (document.getElementById('nextbtn') as any).disabled = false;
          // (document.getElementById('skipbtn') as any).disabled = true;
        } else {
          (document.getElementById('nextbtn') as any).disabled = false;
          // (document.getElementById('skipbtn') as any).disabled = true;

        }
        break;
      case (this.START_COUNT + 4):
        if (this.bizmail.valid && this.bizaddress.valid && this.biztel.valid) {
          (document.getElementById('nextbtn') as any).disabled = false;
          // (document.getElementById('skipbtn') as any).disabled = true;
        } else {
          (document.getElementById('nextbtn') as any).disabled = true;
          // (document.getElementById('skipbtn') as any).disabled = true;
        }
        break;
      case (this.START_COUNT + 5):
        if (this.smfacebook.valid || this.sminstagram.valid || this.smlinkedin.valid || this.smtwitter.valid || this.smpint.valid || this.smyoutube.valid) {
          (document.getElementById('nextbtn') as any).disabled = false;
          // (document.getElementById('skipbtn') as any).disabled = true;
        } else {
          (document.getElementById('nextbtn') as any).disabled = false;
          // (document.getElementById('skipbtn') as any).disabled = true;
        }
        break;
    }

  }


  shortName(val: any){
    this.data.set('shortname', val);
  }


  /**
   * For submiting data to a backend RESTFul API
   */
  
  submitData(): void {

    this.submitted = true;
    
    this.data.set('bizname', this.bizname.value);
    this.data.set('bizdesc', this.bizdesc.value);
    this.data.set('webtype', this.webtype.value);
    this.data.set('bizmail', this.bizmail.value);
    this.data.set('biztel', this.biztel.value);
    this.data.set('bizaddr', this.bizaddress.value);
    this.data.set('soclinkedin', this.smlinkedin.value);
    this.data.set('socpinterest', this.smpint.value);
    this.data.set('socyoutube', this.smyoutube.value);
    this.data.set('socinstagram', this.sminstagram.value);
    this.data.set('soctwitter', this.smtwitter.value);
    this.data.set('socfacebook', this.smfacebook.value);
    if(this.theme.value == ''){
      try {
        this.data.set('theme', this.filterTemplate[0].template_id);
      } catch (error) {
        this.snackbar.open('an Error occured', '', {duration: 4000, panelClass: ['bg-danger', 'text-light', 'font-weight-bold']})
      }
    }else{
      this.data.set('theme', this.theme.value);
    }

    if(this.logoname.value === "" || this.logoname.value === undefined){
      this.data.set('logoname', '');
    }
    this.data.set('store_name', this.store_name.value);

   
    this.service.postGetstated(this.data).subscribe(
        async (res: any) => {
          await console.log(res);
          this.submitted = false;
          if(res.success === true){
            this.router.navigate(['/dash']);
            await this.snackbar.open(res.message, 'close', {panelClass: ['bg-primary', 'text-light', 'font-weight-bold']});
          }else{
           await this.snackbar.open(res.message, 'close');
          }
        },
        err => {
          this.snackbar.open(err, '', {panelClass: ['bg-danger', 'text-light', 'font-weight-bold'], duration: 3000});
          this.submitted = false;
        }
      )
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
