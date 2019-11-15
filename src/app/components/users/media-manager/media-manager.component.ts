import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef} from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserserviceService } from 'src/app/services/userservice.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-media-manager',
  templateUrl: './media-manager.component.html',
  styleUrls: ['./media-manager.component.css']
})
export class MediaManagerComponent implements OnInit {

  task = "list";
  imgList: any;
  @ViewChild('dropzone', {static: false}) dropzone : ElementRef;

  constructor(
    private dialogRef: MatDialogRef<MediaManagerComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private service: UserserviceService
  ) { }

  ngOnInit() {

    this.service.postImageUpload(null).subscribe( event =>{
      this.imgList = event;
    });
  }

  imageUpload(){
    this.service.postImageUpload(null).subscribe( event =>{
      this.imgList = event;
    })
  }

prev;
selectLink(index){
  this.prev = index;
}







  closeDialog(){
    this.dialogRef.close();
    
  }

}
