import { Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { AdminMailComponent } from '../admin-mail/admin-mail.component';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private adminServ: AdminserviceService,
    private actRt: ActivatedRoute,
    private innerServ: AdminService
  ) { }

  ngOnInit() {
    this.actRt.data.subscribe(
      d => {
        console.log(d)
        this.innerServ.account.next(d.acc);
        
      },
      err => {
        console.log(err)
      }
    )
  }

  sendMail(){
    this.dialog.open(AdminMailComponent, {
      maxWidth: '500px',
      minWidth: '300px',
      width: "100%",
      // height: '100%',
      position: {
        bottom: "1%",
        right: '1%'
      }
    })
  }

}
