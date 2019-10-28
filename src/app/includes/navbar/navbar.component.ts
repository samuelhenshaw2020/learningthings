import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isLogPage: boolean = true;

  constructor() { }


  ngOnInit() {

  }

  goBack(): void{
    window.history.back();

  }

 
}
