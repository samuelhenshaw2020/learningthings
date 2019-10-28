import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLogPage: boolean = false;
  isUi: boolean = true;

  constructor(
    private param: Router
  ) { }

  ngOnInit() {
    

   
  }

  

  

}
