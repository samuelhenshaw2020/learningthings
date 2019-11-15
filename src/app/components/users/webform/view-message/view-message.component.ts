import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {

  constructor(
    private activatedroute: ActivatedRoute,
    private dialogRef: MatDialogRef<ViewMessageComponent>
  ) { }

  ngOnInit() {
    let o = this.activatedroute.snapshot.paramMap.get('id');
    console.log(o)
  }

  close(){
    this.dialogRef.close();
  }



}
