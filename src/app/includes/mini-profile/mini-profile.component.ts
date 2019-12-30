import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit {

  // @Input('profile') profile = [];

  constructor(
    public dialogRef: MatDialogRef<MiniProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

}
