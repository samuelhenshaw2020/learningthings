import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/components/users/product/product.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<AddExperienceComponent>,
    private prodS: ProductService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  expGroup = this.fb.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    position: ['', [Validators.required]],
    company: ['', [Validators.required]],
    desc: ['', [Validators.required]],
  })

  get from(){return this.expGroup.get('from')}
  get to(){return this.expGroup.get('to')}
  get position(){return this.expGroup.get('position')}
  get company(){return this.expGroup.get('company')}
  get desc(){return this.expGroup.get('desc')}

  ngOnInit() {
  }

  addNew(){
    let exp = {
      success: true,
      from: this.from.value,
      to: this.to.value,
      position: this.position.value,
      company: this.company.value,
      desc: this.desc.value
    }

    this.dialogRef.close(exp);
  }

  close($event: MouseEvent){
    $event.preventDefault();
    this.dialogRef.close({success: false});
  }


}
