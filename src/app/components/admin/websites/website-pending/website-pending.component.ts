import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { AdminService } from '../../admin.service';
import { map, tap, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ViewSiteComponent } from '../../view-site/view-site.component';
import { AdminMailComponent } from '../../admin-mail/admin-mail.component';
import { MiniProfileComponent } from 'src/app/includes/mini-profile/mini-profile.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-website-pending',
  templateUrl: './website-pending.component.html',
  styleUrls: ['./website-pending.component.css']
})
export class WebsitePendingComponent implements OnInit {

  sites = [];
  ended = false;
  total = 0;
  prev;
  reqMail = false;

  constructor(
    private dialog: MatDialog,
    private adminServ: AdminserviceService,
    private innerServ: AdminService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.data
      .subscribe(d => {
        this.sites = d.pending.message;
        this.total = d.total;
        console.log(d)
      })
  }

  viewSite(val) {
    let data = this.sites.filter(d => {
      return d.site_id === val
    })


    this.dialog.open(ViewSiteComponent, {
      data: data[0],
      panelClass: ['bg-black-light'],

    })

  }

  userProfile(user, $event) {

    let rect: DOMRect = $event.target.getBoundingClientRect();

    console.log(rect)

    this.adminServ.get_single_user(user).subscribe(async d => {
      console.log(d)

      this.dialog.open(MiniProfileComponent, {
        data: d.message[0],
        minWidth: "300px",
        position: {
          top: (rect.top) + 'px',
          right: (rect.x - rect.left + 50) + 'px'
        },
        //  panelClass: ['bg-dark'],

      })
    },
      err => {
        console.log(err)
      }, () => {
        this.prev = null;
      })

  }


  sendMail(user) {
    this.reqMail = true;
    this.adminServ.get_user_mail(user).subscribe(async d => {
      console.log(d)

      this.dialog.open(AdminMailComponent, {
        data: { email: d.message[0].user_mail, task: '_target' },
        width: "350px",
        disableClose: true


      })
    },
      err => {
        console.log(err)
      }, () => {
        this.prev = null;
        this.reqMail = false;
      })
  }

  isApproving = false;
  approveSite(id){
    this.isApproving = true;
    this.adminServ.approve_site(id, 1).subscribe(
      d =>{
        console.log(d)
        if(d.success){
          this.sites.map(m => {
            if(m.site_id === id){
               this.sites.splice(this.sites.indexOf(m), this.sites.indexOf(m) + 1)
            }
          })
        }
      },
      err => {
        console.log(err)
      },
      ()=>{
        this.prev = null;
      }
    )
  }

}
