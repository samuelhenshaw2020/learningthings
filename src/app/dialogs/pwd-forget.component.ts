import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pwd-forget',
  template: `
  <div mat-dialog-content>
  <p class="text-center">
  
      <i class="fa fa-check-circle fa-lg text-success numbers  display-2" *ngIf="data.success"></i>
      <i class="fa fa-close fa-lg text-danger numbers  display-2" *ngIf="!data.success"></i>
   </p>
  <p class="small text-center font-2">{{data.msg}}</p>
</div>
<br>
<div mat-dialog-actions align="center">
<button mat-button (click)="onNoClick()">
    Ok
  </button>
</div>

  `
})
export class PwdForgetComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PwdForgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // this.dialogRef.updatePosition({bottom: '5%', right: '5%'});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
