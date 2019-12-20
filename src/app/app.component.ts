import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ResolveStart, ResolveEnd, NavigationError } from '@angular/router';
import { LyTheme2, ThemeVariables } from '@alyle/ui';

const STYLES = (theme: ThemeVariables) => ({
  '@global': {
    body: {
      backgroundColor: theme.background.default,
      color: theme.text.default,
      fontFamily: theme.typography.fontFamily,
      margin: 0,
      direction: theme.direction
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly classes = this.theme.addStyleSheet(STYLES);

  title = 'testing';
  resolving: boolean = false;
  @ViewChild('view', {static:false}) view: ElementRef


 constructor(private theme: LyTheme2,
              route: Router){
    route.events.subscribe(e=>{
      if(e instanceof ResolveStart){
        // console.log('started');
        this.resolving = true;
        console.log()
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
