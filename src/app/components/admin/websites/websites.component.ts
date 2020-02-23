import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ViewSiteComponent } from '../view-site/view-site.component';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { tap, filter, switchMap } from 'rxjs/operators';
import { from, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  night;
  constructor(
    private activeRoute: ActivatedRoute,
    
    private innerServ: AdminService
  ) { }

  ngOnInit() {

    this.innerServ.night.subscribe(d =>{
      this.night = d;
    })

    this.activeRoute.data.subscribe(
      data => {
        console.log(data);
        
       try {
        this.innerServ.sitesItems.next(data.web)
       } catch (error) {
         
       }finally{
       
       }
        
      },
      err => {
        console.log(err)
      }
    );

   
  }

 


}
