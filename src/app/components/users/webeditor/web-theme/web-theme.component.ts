import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-theme',
  templateUrl: './web-theme.component.html',
  styleUrls: ['./web-theme.component.css']
})
export class WebThemeComponent implements OnInit {

  theme = [1,2,3]

  constructor() { }

  ngOnInit() {
  }

  prev = 0;
  selected(index){
    this.prev = index;
  }

}
