import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  constructor() { }

  usersList = [
    1,2,3,4,5
  ]

  ngOnInit() {
  }

}
