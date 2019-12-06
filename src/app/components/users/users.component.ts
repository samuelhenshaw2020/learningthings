import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar, fadeInContent } from '@angular/material';
import { Observable, interval, timer } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { identity_model } from './webeditor/web.model';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fadeInContent]
})
export class UsersComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  @ViewChild('main', {static: false}) main: ElementRef;

  minimize: boolean = false;
  public site_data: any;
  logo ;
  sitename = 'No site';
  selected_site  = '';
  imgBaseUrl ;
  isfetching = false;
  template_type;
  isCommerce = false;

  not = [
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()},
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()},
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()}
  ]

  not_open = false;
  

  

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private service: UserserviceService,
    private snackbar: MatSnackBar,
    private router: Router
  
  ) { 
    this.imgBaseUrl =this.service.baseImgUrl;
    
  }

  no_site = false;
  othersites ;
  web_type;
  ngOnInit() {
    this.fetchData();
    this.getSite();

    
  }


 

 


  getSite(){
    this.service.postGetSiteList().subscribe(async d =>{
      this.othersites = d;
      console.log(d)
      
      
   }, 
   err => {
      this.snackbar.open("an error occured please contact admin", 'close', {duration: 4000})
   })
  }


  fetchData(){
    this.activatedRoute.data.subscribe(
      async (data) =>{
        console.log(data)
        
         if(data.site_data.success !== false){
          this.web_type = data.site_data.type;
          let stripData: identity_model = data.site_data;
          
          this.service.siteData.next(stripData)
      
         }

        if(data.site_data.success === false){
          this.no_site = false;
          this.service.site_status = false;
        }else{
          this.no_site = true;
          this.service.site_status = true;
        }
        
     },
     err => {
      
      console.log(err);
     }
     
     );

    
     if(this.no_site === true){
      this.service.siteData.subscribe(d => {this.logo = d.logo; this.sitename = d.business_name; this.selected_site = d.business_name});
     }

  }

  count = 0;
  newsite(val){
    this.isfetching = true;
    this.service.postSwitchSite({site_id: val}).subscribe(d => {
      // console.log(d)
      // this.service.getWebData().subscribe(d => {
        // this.service.siteData.next(d)
        // this.getSite();
        // this.isfetching = false;
        this.count = 2;
        let g = interval(1000).subscribe(()=>{
          if(this.count > 0){
            this.count--;
          }else{
            this.count = 0;
            window.location.href = window.location.href
            g.unsubscribe();
          }
        })
      // })
    })
  }

  logout(){
    localStorage.removeItem("_token");
    this.router.navigate(["/home"]);
  }


  isContext = true;
  conf($event){
   $event.preventDefault();
   (document.getElementById('menu') as any).style.top =  $event.pageY +"px";
   (document.getElementById('menu') as any).style.left =   ($event.pageX - 50) +"px";
   this.isContext = false;
  }

  closeContext(val?){
      timer(100).subscribe(d =>{
        this.isContext = true
    
        if(val === 'site'){
          this.router.navigate(["/dash/website/identity"])
        }
    
        if(val === 'user'){
          // this.router.navigate(["/dash/website/identity"])
        }
    
        if(val === 'back'){
          window.history.back();
        }
    
        if(val === 'forward'){
          window.history.forward();
        }
      })
    
    
    }


  

}
