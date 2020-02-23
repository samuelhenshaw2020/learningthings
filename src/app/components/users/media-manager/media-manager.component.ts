import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef} from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-media-manager',
  templateUrl: './media-manager.component.html',
  styleUrls: ['./media-manager.component.css']
})
export class MediaManagerComponent implements OnInit {

  task = "list";
  imgList = [];
  baseUrl;
  link:any;
  @ViewChild('dropzone', {static: false}) dropzone : ElementRef;

  constructor(
    private dialogRef: MatDialogRef<MediaManagerComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private service: UserserviceService,
    private snackbar: MatSnackBar
  ) { 
    this.baseUrl = this.service.baseImgUrl;
  }

  ngOnInit() {
   
    this.getImages();
  }

  loading = false;
  getImages(){
  this.loading = true;

    this.service.postUploadedImg().subscribe( event =>{
      this.imgList = event; 
      this.loading = false
    })
  }

 

  logospin: boolean = false;
  image;
  imagelink;
  formdata: FormData = new FormData();
  
  async previewimage($event) {

    let img = $event.target.files[0];
    let regex: RegExp = /\.(jpe?g|png|gif|svg)$/i;

    if ($event.target.value.length > 0) {
      if (regex.test(img.name)) {
        this.image = new FileReader();

        this.image.onloadstart = () => {
          this.logospin = true;
        }

        this.image.onloadend = async () => {
          this.logospin = false;
          this.imagelink = this.image.result;
          this.formdata.set("image", img);
          
        }
        await this.image.readAsDataURL($event.target.files[0]);

      } else {
        await this.snackbar.open(`${img.type} is not type JPG|PNG|JPEG|SVG `, "Close")
      }
    } else {
      await this.snackbar.open(`Logo not selected. NEXT below to skip `, "Close")
    }


  }

  uploading = false;
  uploadimage(view){
    this.uploading = true;
    this.formdata.set('site_id', String(this.service.siteData().value.id));
    this.service.postuploadImg(this.formdata).subscribe(d=>{
      console.log(d);
      this.imgList.unshift(d.image)
      this.uploading = false;
      view.click();
    },
    err => {
      this.uploading = false;
      this.snackbar.open('Upload failed! Please contact admin via Support. Thanks', 'close', {duration: 8000}) 
    }
    )
  }


prev;
selectLink(index){
  this.prev = index;
}







  closeDialog(){
    this.dialogRef.close();
    
  }

}
