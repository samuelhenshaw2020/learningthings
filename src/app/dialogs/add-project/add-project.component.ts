import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { ProductService } from 'src/app/components/users/product/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MediaManagerComponent } from 'src/app/components/users/media-manager/media-manager.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<AddProjectComponent>,
    private prodS: ProductService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private rootS: AppService,
    private dialog: MatDialog
  ) { }

  proGroup = this.fb.group({
    projectname: ['', [Validators.required]],
    desc: ['', [Validators.required]],
  })

  get projectname(){return this.proGroup.get('projectname')}
  get desc(){return this.proGroup.get('desc')}

  ngOnInit() {
  }

 



  addNew(){
   
    let pro = {
      success: true,
      projectname: this.projectname.value,
      desc: this.desc.value
    }

    this.dialogRef.close(pro);
  }

  close($event: MouseEvent){
    $event.preventDefault();
    this.dialogRef.close({success: false});
  }


}
