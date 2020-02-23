import { Component, OnInit, NgZone } from '@angular/core';
import { AdminService } from '../admin.service';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { interval, from } from 'rxjs';
import { count, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  night;
  site_count: number = null;
  user_count:number = null;

  store_count:number = 0;
  blog_count: number = 0;
  port_count: number = 0;
  biz_count: number = 0;

  blog_per = 0;
  store_per = 0;
  port_per = 0;
  biz_per = 0;


  



  constructor(
    private adServ: AdminService,
    private adminServ: AdminserviceService,
    private ngZone: NgZone
  ) { }
  
  ngOnInit() {
    this.adServ.night.subscribe(d => {
      this.night = d;
    })

    this.adminServ.siteInfo()
    .subscribe(
      async (data:any) => {
        console.log(data)
        if(data.success){
      
          this.user_count = data.users

          this.site_count = data.sites.length;

          this.store_count = data.sites.filter(function(f){
            return f.category == "ecommerce";
          }).length;

          this.blog_count = await data.sites.filter(function(f){
            return f.category == "blog";
          }).length

          this.port_count = data.sites.filter(function(f){
            return f.category == "portfolio";
          }).length;

          this.biz_count = data.sites.filter(function(f){
            return f.category == "business";
          }).length;


          this.blog_per = await Math.floor((this.blog_count * 100) / this.site_count);
          this.port_per = await Math.floor((this.port_count * 100) / this.site_count);
          this.store_per = await Math.floor((this.store_count * 100) / this.site_count);
          this.biz_per = await Math.floor((this.biz_count * 100) / this.site_count);
          

         

        }
      
      }, 
      (err) => {
        console.log(err)
      }
    );
  }

  // custom function
 

}
