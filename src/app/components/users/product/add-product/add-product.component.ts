import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MediaManagerComponent } from '../../media-manager/media-manager.component';
import { timer } from 'rxjs';
import { ProdVariationComponent } from 'src/app/dialogs/prod-variation/prod-variation.component';

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
 


  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
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
  });

  get product_name(){return this.prodForm.get('product_name')}
  get price(){return this.prodForm.get('price')}
  get sales_price(){return this.prodForm.get('sales_price')}
  get amount_in_stock(){return this.prodForm.get('amount_in_stock')}
  get stock_status(){return this.prodForm.get('stock_status')}
  get sub_category(){return this.prodForm.get('sub_category')}
  get product_description(){return this.prodForm.get('product_description')}
  get category_id(){return this.prodForm.get('category_id')}

  ngOnInit() {
  }

  getDiscount(){
    setTimeout(()=>{
      let disc = Math.floor((Number(this.sales_price.value) * 100 /Number(this.price.value)));
      this.discount = disc <= 100 ? disc + '%' : 'above 100%';
      console.log(Number(this.sales_price.value) * 100 /Number(this.price.value) );
    }, 1000);

    
  }

  addVariant(key, value){
    console.log(this.prodVariants)
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
      
      const dialogRef = this.dialog.open(MediaManagerComponent, {
        minWidth: '90%',
        minHeight: "500px",
        maxHeight: "500px",
        disableClose: true
      });
  
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
        disableClose: true
    })

    dialogRef.afterClosed().subscribe(va => {
      console.log(va);
    })
  }


  
  sendProd(){
    this.formData = new FormData();
    // this.formData.append("product_name", this.product_name.value);
    this.formData.set('product_name', this.product_name.value);
    this.formData.set('price', this.price.value);
    this.formData.set('sales_price', this.sales_price.value);
    this.formData.set('amount_in_stock', this.amount_in_stock.value);
    this.formData.set('stock_status', this.stock_status.value);
    this.formData.set('sub_category', this.sub_category.value);
    this.formData.set('variations', Object(this.prodVariants));
    this.formData.set('product_descriptions', this.product_description.value);
    this.formData.set('category_id', this.category_id.value)
    this.formData.set('images', Object(this.imglink))
    console.log(this.formData);
    this.service.postSignin(this.formData).subscribe(d=>{
      console.log(d)
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
