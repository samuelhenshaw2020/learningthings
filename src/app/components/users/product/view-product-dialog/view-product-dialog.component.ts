import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LyDialogRef, LY_DIALOG_DATA } from '@alyle/ui/dialog';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product-dialog',
  templateUrl: './view-product-dialog.component.html',
  styleUrls: ['./view-product-dialog.component.css']
})
export class ViewProductDialogComponent implements OnInit {

  imageurl;

  constructor(
    public dialogRef: LyDialogRef,
    @Inject(LY_DIALOG_DATA) public data: any,
    private prodS: ProductService,
    private router: Router
  ) { 
    this.imageurl = prodS.imageurl;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

  closeAndNavigate(){
    this.close()
    this.router.navigateByUrl("/dash/product/edit/"+ this.data.product_id);
  }
}
