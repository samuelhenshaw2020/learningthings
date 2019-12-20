import { Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { AdminMailComponent } from '../admin-mail/admin-mail.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
