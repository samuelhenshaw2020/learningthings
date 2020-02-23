import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { ViewProductDialogComponent } from './view-product-dialog/view-product-dialog.component';
import { LyDialog } from '@alyle/ui/dialog';
import { LyTheme2 } from '@alyle/ui';

const STYLES_DIALOG = ({
  width: '100vw',
  height: '100vh',
  borderRadius: 0
});

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private infiniteScroll = new BehaviorSubject<any>(false);
  private base = "/user/";
  public imageurl = "http://192.168.1.100:8000/";
  private prod_categories = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private _dialog: LyDialog,
    private _theme: LyTheme2
  ) { }

  get infiniteScrolls(){
    return this.infiniteScroll;
  }

  newCategory(cat){
    return this.http.post<any>(this.base+'add_prod_cat', cat);
  }

  productCategories(){
    return this.http.get<any>(this.base+'product_categories');
  }

  uploadProduct(details){
    return this.http.post<any>(this.base+'create_product', details);
  }

  delProd(details){
    return this.http.post<any>(this.base+'delete_prod', details);
  }

  get_sub(){
    return this.http.get<any>(this.base+'sub_cat');
  }


  // Dialog
  add_category(){
    return this.dialog.open<AddCategoryDialogComponent>(AddCategoryDialogComponent, {
        data: {},
        disableClose: true,
        minWidth: "350px",
    });
  }


  view_prod(data){
    // return this.dialog.open<ViewProductDialogComponent>(ViewProductDialogComponent, {
    //     data: data,
    //     disableClose: true,
    //     minWidth: "350px",
    //     panelClass: ['dialog']
    // });
    const dialogRef = this._dialog.open<ViewProductDialogComponent>(ViewProductDialogComponent, {
      maxWidth: null, // current style overrides
      maxHeight: null, // current style overrides
      containerClass: this._theme.style(STYLES_DIALOG),
      data: data
    });
    
  
  }


  // BehaviourSUbject
  get categories(){
    return this.prod_categories;
  }

  setCategories(value){
    this.prod_categories.next(value)
  }

}
