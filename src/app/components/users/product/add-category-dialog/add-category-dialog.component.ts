import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private prodS: ProductService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  category = '';
  checking =false;

  addNew(){
    this.checking = true;
    
   if(this.category === ''){
     this.snackbar.open("Please enter a valid category", "close", {duration: 5000});
   }else{
    this.prodS.newCategory({category: this.category}).subscribe(
      data => {
        this.checking = false;
        if(data.success == true){
          this.dialogRef.close(data.category);
        }
      }, 
      err => {
        this.checking = false;

      }
    );
   }
  }

  
  close($event: MouseEvent){
    $event.preventDefault();
    this.dialogRef.close(false);
  }

}
