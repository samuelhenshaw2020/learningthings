import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEducationComponent>,
  ) { }

  eduGroup = this.fb.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    course: ['', [Validators.required]],
    university: ['', [Validators.required]],
    desc: ['', [Validators.required]],
  })

  get from(){return this.eduGroup.get('from')}
  get to(){return this.eduGroup.get('to')}
  get course(){return this.eduGroup.get('course')}
  get university(){return this.eduGroup.get('university')}
  get desc(){return this.eduGroup.get('desc')}

  ngOnInit() {
  }

  addNew(){
    let exp = {
      success: true,
      from: this.from.value,
      to: this.to.value,
      course: this.course.value,
      university: this.university.value,
      desc: this.desc.value
    }

    this.dialogRef.close(exp);
  }

  close($event: MouseEvent){
    $event.preventDefault();
    this.dialogRef.close({success: false});
  }

}
