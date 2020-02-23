import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute, RouterStateSnapshot, RouterLink, NavigationEnd } from '@angular/router';
import { slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLogPage: boolean = false;
  isUi: boolean = true;
  isVerifymail: boolean; 


  constructor(
    private router: Router
  ) {
this.router.events.subscribe(async e =>{
   if(e instanceof NavigationEnd){
     if(e.url == '/login/verify'){
      this.isVerifymail = true;
     }else{
      this.isVerifymail = false;
     }
   }
})
   }

  ngOnInit() {
    
   
   
  }

  

  

}
