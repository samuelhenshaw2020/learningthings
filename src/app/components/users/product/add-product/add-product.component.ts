import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MediaManagerComponent } from '../../media-manager/media-manager.component';
import { timer } from 'rxjs';
import { ProdVariationComponent } from 'src/app/dialogs/prod-variation/prod-variation.component';
import { LyDialogRef } from '@alyle/ui/dialog';
import { ProductService } from '../product.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  prodVariants: any[] = [ ];
  imglink:any[] = [];
  formData : FormData;
  site_id;
  discount: string | number = 0;
  baseImgUrl = null;
  categories;
  sub_cat;
 


  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private prodS: ProductService,
    private userS: UserserviceService,
    private rootS: AppService
  ) {
    this.baseImgUrl = this.service.baseImgUrl;
   }



  prodForm = this.fb.group({
    product_name: ['', []],
    price: [0 , []],
    sales_price: [0, []],
    amount_in_stock: [0, []],
    stock_status: ['', []],
    sub_category: ['', []],
    product_description: ['', []],
    category_id: ['', []],
    weight: ['', []],
  });

  get product_name(){return this.prodForm.get('product_name')}
  get price(){return this.prodForm.get('price')}
  get sales_price(){return this.prodForm.get('sales_price')}
  get amount_in_stock(){return this.prodForm.get('amount_in_stock')}
  get stock_status(){return this.prodForm.get('stock_status')}
  get sub_category(){return this.prodForm.get('sub_category')}
  get product_description(){return this.prodForm.get('product_description')}
  get category_id(){return this.prodForm.get('category_id')}
  get weight(){return this.prodForm.get('weight')}

  ngOnInit() {
    this.getCategory();
    this.get_sub_cat();

    
  }

  subing = false
  get_sub_cat(){
    this.subing = true
    this.prodS.get_sub().subscribe(
      cat => {
        this.sub_cat = cat.sub_category;
        this.subing = false;

      }
    );
  }

  getCategory(){
    this.prodS.categories.subscribe(
      data => {
        this.categories = data;
        // console.log(data)

      }
    )
  }

  adding = false;
  sendProd(){
    this.adding = true;
    // this.formData = new FormData();
    // this.formData.set('product_name', this.product_name.value);
    // this.formData.set('price', this.price.value);
    // this.formData.set('sales_price', this.sales_price.value);
    // this.formData.set('amount_in_stock', this.amount_in_stock.value);
    // this.formData.set('stock_status', this.stock_status.value);
    // this.formData.set('sub_category', this.sub_category.value);
    // this.formData.set('variations', Object(this.prodVariants));
    // this.formData.set('product_descriptions', this.product_description.value);
    // this.formData.set('category_id', this.category_id.value)
    // this.formData.set('weight', this.weight.value)
    // this.formData.set('images', Object(this.imglink))
    // this.formData.set('site_id', String(this.service.siteData().value.site_id))
    
    let data = {
      product_name: this.product_name.value,
      price: this.price.value,
      sales_price: this.sales_price.value,
      amount_in_stock: this.amount_in_stock.value,
      stock_status: this.stock_status.value,
      sub_category: this.sub_category.value,
      variations: this.prodVariants,
      category_id: this.category_id.value,
      product_description: this.product_description.value,
      weight: this.weight.value,
      images: this.imglink,
      site_id: String(this.service.siteData().value.id)
    }

    this.prodS.uploadProduct(data).subscribe(
      data => {
        this.adding = false;
        this.snackbar.open(data.message, 'close', {duration: 5000, panelClass: ['text-primary', 'bg-light']})
        if(data.success == true){
          this.userS.product.value.product.data.unshift(data.product);
        }
      }, 
      err => {
        this.adding = false;
      }
    );
   
    
  }

  addCategory(s, $event: MouseEvent){
      $event.preventDefault();
    
      this.prodS.add_category().afterClosed().subscribe(
        data => {
          this.categories.unshift(data);
          s.selectedIndex = 1;
        }, 
        err => {
          
        }
      );
    

   


  }


  trackByIndex(index, cat){
    
    return cat.category_id;
  }

 


  getDiscount(){
    setTimeout(()=>{
      let disc = Math.floor((Number(this.sales_price.value) * 100 /Number(this.price.value)));
      disc = 100 - disc;
      this.discount = disc <= 100 ? disc  + '%' : '100%';
      // this.discount = 100 - this.discount
      // console.log(Number(this.sales_price.value) * 100 /Number(this.price.value) );
    }, 1000);

    
  }

  addVariant(key, value){
    // console.log(this.prodVariants)
    if(key != '' && value != ''){

      let splitval: any[] = value.split(',');
     
        this.prodVariants.push({'key': key, 'value': splitval});
      
    }
  }

  remove(index, task?){
      if(task === 0){
        this.imglink.splice(index, 1);
      }else if(task === 1){
        this.prodVariants.splice(index, 1);
      }
  }

  
  addImage(index){
    if(this.imglink.length === 6 && index === 1){
      this.snackbar.open("Cant add more than 6 images", "close");
    }else{
      
      const dialogRef = this.rootS.mediaBox();
  
      dialogRef.afterClosed().subscribe(link => {
        
        if(link != undefined){
          if(index === 0){
             try {
               this.imglink.shift();
             } catch (error) {
               
             }finally{
              this.imglink.unshift(link.substr(link.search('images'), link.length));
             }
          }else{
            this.imglink.push(link.substr(link.search('images'), link.length));
          }
        }
        console.table(this.imglink);
      })
    }
  }


  add_variation(){
    let dialogRef = this.dialog.open(ProdVariationComponent, {
        minWidth: '300px',
        minHeight: "400px",
        maxHeight: "400px",
        disableClose: true,
        panelClass: ['front']
        
    })

    dialogRef.afterClosed().subscribe(va => {
      console.log(va);
    })
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
