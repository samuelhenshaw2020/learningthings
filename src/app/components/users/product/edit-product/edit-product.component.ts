import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material';
import { timeout } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  prod_id;
  prod:any = {};
  discount;
  categories;
  constructor(
    private route: ActivatedRoute,
    private prodS: ProductService,
    private userS: UserserviceService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (param: any) => {
        this.filterData(param.params.prod_id);
      }
    );
    this.getCategory();
    // document.body.style.overflow = 'hidden';
    // this.innerWidth = window.innerHeight + "px";
  }

  getCategory(){
    this.prodS.categories.subscribe(
      data => {
        this.categories = data;
        // console.log(data)

      }
    )
  }

  updating = false;
  updateProd(){
    this.updating = true;

    this.prodS.uploadProduct(this.prod).subscribe(
      data => {
        this.updating = false;

        this.snackbar.open(data.message, 'close', {duration: 5000, panelClass: ['text-primary', 'bg-light']})
      }, 
      err => {
        this.updating = false;
        
      }
    );
  }

  

  filterData(id){
    this.userS.product.subscribe(
      async (data: any) => {
        let ar: Array<any> = data.product.data;
        if(ar.length ==0){
          this.snackbar.open("Please select a product from product list!", 'close', {duration: 5000, panelClass: ['text-danger', 'bg-light']});
          timer(2000).subscribe(t => {
            this.router.navigateByUrl('/dash/product/all')
          })
        }else{
          let d = ar.filter(f => {
            return f.product_id == id;
          })[0]
          this.prod = d;
         
          this.getDiscount();
          }
        }
    );
  }

  getDiscount(){
    setTimeout(()=>{
      let disc = Math.floor((Number(this.prod.sales_price) * 100 /Number(this.prod.price)));
      disc = 100 - disc;
      this.discount = disc <= 100 ? disc  + '%' : '100%';
      // this.discount = 100 - this.discount
      // console.log(Number(this.sales_price.value) * 100 /Number(this.price.value) );
    }, 500);

    
  }

  

   /**********************************
   * The config for the angular editor
   ***********************************/
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '250px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
};

}
