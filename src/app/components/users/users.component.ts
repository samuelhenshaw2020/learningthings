import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar, fadeInContent } from '@angular/material';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { identity_model } from './webeditor/web.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fadeInContent]
})
export class UsersComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  minimize: boolean = false;
  public site_data: any;
  logo ;
  sitename;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private service: UserserviceService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      async (data) =>{
        console.log(data)
        let stripData: identity_model = data.site_data;
        
        this.service.siteData.next(stripData)
     },
     err => {
      console.log(err);
     }
     
     );

    
     this.service.siteData.subscribe(d => {this.logo = d.logo; this.sitename = d.header_title});

    
  }

  

}
