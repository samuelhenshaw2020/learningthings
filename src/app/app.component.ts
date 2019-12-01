import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ResolveStart, ResolveEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testing';
  resolving: boolean = false;
  @ViewChild('view', {static:false}) view: ElementRef


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

 top;
 left;
 cont($event: MouseEvent) {
  $event.preventDefault();
  this.top = $event.pageX;
  this.left = $event.pageY;
  this.view.nativeElement.style.left = this.top + 'px';
  this.view.nativeElement.style.top = this.left + 'px';
  console.log(this.top + "  " + this.left)
  /* INSERT CODE HERE */
}



 
 
 
  




}
