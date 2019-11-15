import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MediaManagerComponent } from '../../media-manager/media-manager.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  prodVariants: any[] = [ ];
 


  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  prodForm = this.fb.group({
    prod_name: ['', [Validators.required]],
    prod_price: [0, [Validators.required]],
    prod_discount: [0 , [Validators.required]],
    prod_salesprice: [0, [Validators.required]],
    prod_stock: ['', [Validators.required]],
    prod_desc: ['', [Validators.required]]
  });

  get prod_name(){return this.prodForm.get('prod_name')}
  get prod_price(){return this.prodForm.get('prod_price')}
  get prod_discount(){return this.prodForm.get('prod_discount')}
  get prod_salesprice(){return this.prodForm.get('prod_salesprice')}
  get prod_stock(){return this.prodForm.get('prod_stock')}
  get prod_desc(){return this.prodForm.get('prod_desc')}

  ngOnInit() {
  }

  addVariant(key, value){
    console.log(this.prodVariants)
    if(key != '' && value != ''){

      let splitval: any[] = value.split(',');
     
        this.prodVariants.push({'key': key, 'value': splitval});
        // console.log();
    }
  }

  remove(index){
      this.imglink.splice(index, index)
      console.log(index +'  '+ (index+1))
  }

  imglink: any[] = []
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
              this.imglink.unshift(link);
             }
          }else{
            this.imglink.push(link);
          }
        }
        console.table(this.imglink);
      })
    }
  }


  formData = new FormData();
  sendProd(){
    console.log(this.prodForm.value)
   
    this.formData.append('prod_name', this.prod_name.value);
    this.formData.append('prod_price', this.prod_price.value);
    this.formData.append('prod_discount', this.prod_discount.value);
    this.formData.append('prod_salesprice', this.prod_salesprice.value);
    this.formData.append('prod_stock', this.prod_stock.value);
    this.formData.append('prod_desc', this.prod_desc.value);
    this.formData.append('prod_props', Object(this.prodVariants));
    this.service.postAdvanceSearch(this.formData).subscribe((data)=>{
        console.log(data)
    });
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
