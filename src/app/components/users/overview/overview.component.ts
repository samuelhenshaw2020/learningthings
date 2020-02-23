import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin/admin.service';
import { PostService } from '../post/post.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public site_data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UserserviceService,
    private admin: AdminService,
    private postS: PostService,
    private snackbar: MatSnackBar
  ) { }
 
  no_site;
  temp;
  night;
  blog_post = null;

  post_count: number | string | any = 0;
  customer_count: number | any = 0;
  order_count: number | any = 0;
  report_count: number | any = 0;
  order_list: any;
  feeds_count: any = 0;

  prev_link: string = '';
  ngOnInit() {
    
    this.getCount();
  this.nightMode();

  this.getPreviewUrl()

    // this.no_site = this.service.no_site;
    // this.service.getTemplate().subscribe(d => {
    //    this.temp = d.filter(d => {
    //      return d.template_id === this.service.siteData.value.template_id;
    //    })
    //    console.log(this.service.siteData.value.template_id);
       
    // })

    

    
  }

  
  getCount(){
    this.service.getAnalysis().subscribe(
      data => {
        this.order_count = data.order_count;
        this.post_count = data.posts
      },
      err => {

      }
    )
  }


  copyurl(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackbar.open("link copied!", 'close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }


   getPostCount(){
    this.postS.blogall.subscribe(
      post => {
        console.log(post.total)
      }
    );
  }

  getPreviewUrl(){
    this.service.siteData().subscribe(
      link => {
        this.prev_link = link.link;
      }
    );
  }


  nightMode(){
    this.admin.night.subscribe(
      n => {
        this.night = n;
      }
    );
  }

  


}
