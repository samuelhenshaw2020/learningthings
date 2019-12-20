import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-val-num',
  templateUrl: './val-num.component.html',
  styleUrls: ['./val-num.component.css']
})
export class ValNumComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  movies = [
   1,2,3,4,5
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    console.log(this.movies)
  }

}
