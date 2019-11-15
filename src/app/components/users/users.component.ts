import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar, fadeInContent } from '@angular/material';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

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


  constructor(
    private breakpointObserver: BreakpointObserver,
    private serv: UserserviceService
  ) { }

  ngOnInit() {
    // this.serv.getAllSiteInfo().subscribe(d =>{
    //   this.serv.usersiteinfo = d;
    //   console.log(this.serv.usersiteinfo);
    // })
  }

}
