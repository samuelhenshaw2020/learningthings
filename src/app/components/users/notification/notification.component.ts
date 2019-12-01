import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input('not_open') not_open = false;
  @Input('not') not = [];
  

  constructor() { }

  ngOnInit() {
   
  }

 

  

}
