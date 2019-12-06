import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-prod-variation',
  templateUrl: './prod-variation.component.html',
  styleUrls: ['./prod-variation.component.css']
})
export class ProdVariationComponent implements OnInit {

  variant = {
    key: "size",
    value: ['30', '40', 'large']
  };

  key;
  constructor(
    public dialogRef: MatDialogRef<ProdVariationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

  add_field(){
    

    (document.getElementById('contain') as any).innerHTML += `
    
    <div class="form-group">
                <input type="text" class="form-control value" >
        </div>`;
  }

  show(){
    let div = (document.getElementsByClassName('value') as any);
    for(let i=0; i < div.length; i++){
      console.log(div[i].value)
    }
  }



}
