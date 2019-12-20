import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {  ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { async } from 'q';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public site_data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UserserviceService
  ) { }

  no_site;
  temp;
  blog_post = null;
  ngOnInit() {
    
    // this.no_site = this.service.no_site;
    // this.service.getTemplate().subscribe(d => {
    //    this.temp = d.filter(d => {
    //      return d.template_id === this.service.siteData.value.template_id;
    //    })
    //    console.log(this.service.siteData.value.template_id);
       
    // })

    
  }


}
