import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ViewMessageComponent } from '../view-message/view-message.component';

@Component({
  selector: 'app-wf-review',
  templateUrl: './wf-review.component.html',
  styleUrls: ['./wf-review.component.css']
})
export class WfReviewComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }

  viewMsg(){
    this.dialog.open(ViewMessageComponent, {
      maxWidth: '450px',
      disableClose: true
    });
  }

}
