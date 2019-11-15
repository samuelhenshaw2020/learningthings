import { Component, OnInit} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ResolveStart, ResolveEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testing';
  resolving: boolean = false;


 constructor(route: Router){
    route.events.subscribe(e=>{
      if(e instanceof ResolveStart){
        // console.log('started');
        this.resolving = true;
      }else if(e instanceof ResolveEnd){
        // console.log('ended');
        this.resolving = false;
      }else if(e instanceof NavigationError){
        this.resolving = false;
      }
    })
 }






 
 
 
  




}
