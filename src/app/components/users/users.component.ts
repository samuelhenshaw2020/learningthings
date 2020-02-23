import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar, fadeInContent } from '@angular/material';
import { Observable, interval, timer } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { identity_model } from './webeditor/web.model';
import { LyTheme2 } from '@alyle/ui';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { AdminService } from '../admin/admin.service';
import { AppService } from 'src/app/app.service';
import { LyDrawer } from '@alyle/ui/drawer';
import { HomeService } from 'src/app/services/home.service';

const STYLES = ({
  drawerContainer: {
    height: '100%',
    minHeight: window.innerHeight + "px",
    transform: 'translate3d(0,0,0)',
  
  },
  drawerContent: {
    padding: '1em'
  },
  icon: {
    margin: '0 8px'
  },
  grow: {
    flexGrow: 1
  }
});
const DEFAULT = '170px over@XSmall';
const MINI = '120px over@XSmall';



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

  readonly classes = this._theme.addStyleSheet(STYLES);
  mini = true;
  name = null;
  night;

  get width() {
    return this.mini ? MINI : DEFAULT;
  }

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

  color = 'black';
  published = 0;

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
    private router: Router,
    private _theme: LyTheme2,
    private adServ: AdminService,
    private rootService: AppService,
    private adminServ: AdminserviceService,
    private homeS: HomeService
  ) { 
    this.imgBaseUrl =this.service.baseImgUrl;
    this.adServ.night.subscribe(d => {
      this.night = d;
    })

    this.innerWidth = window.innerHeight + "px";
    
    
  }

  no_site = false;
  othersites ;
  web_type;
  innerWidth;
  ngOnInit() {
    this.fetchData();
    this.getSite();
    
    window.onresize = ()=>{
      this.innerWidth = window.innerHeight + 'px';
    }

    document.body.style.overflow = 'hidden';

    this.getColor();
    // this.getLogo();

   
  }


  closeDr(drawer: LyDrawer){
    if(window.innerWidth < 768){
      drawer.toggle();
    }
  }


  // getLogo(){
  //   this.service.siteData().subscribe(
  //     lo => {
  //       this.logo = lo.logo;
  //       console.log()
  //     }
  //   );
  // }

  getColor(){
    this.service.site_color.subscribe(
      col => {
        this.color = col;
      }
    );
  }


  publishing = false;
  publish(pub, publish){

    this.publishing = true;
    let id = this.service.siteData().value.id;
    
    let status = (pub.checked === true ? 1 : 0);
    // console.log(status)
    let data = {
      site_id: id,
      status: status
    }
    this.service.publishService(data).subscribe(
      res => {
      this.publishing = false;
      if(res.status === true){
        this.published = status;
      }

      if(res.status === false){
          this.published = publish;
          pub.checked = !pub.checked
         
      }
        
      },
      err => {
        this.publishing = false;
      },

    );
  }


 

 


  getSite(){
    this.service.postGetSiteList().subscribe(async d =>{
      this.othersites = d;
      // console.log(d)
      
      
   }, 
   err => {
      this.snackbar.open("an error occured please contact admin", 'close', {duration: 4000})
   })
  }


  fetchData(){
    this.activatedRoute.data.subscribe(
      async (data) =>{
        // console.log(data)
        
         if(data.site_data.success !== false){
          this.web_type = data.site_data.type;
          this.service.site_color.next(data.site_data.color);
          this.published = data.site_data.published;
          let stripData: identity_model = data.site_data;
          
          this.service.setSiteData(stripData)
      
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
      
      // console.log(err);
     }
     
     );

    
     if(this.no_site === true){
      this.service.siteData().subscribe(d => {this.logo = d.logo; this.sitename = d.business_name; this.selected_site = d.business_name});
     }

  }

  // count = 0;
  newsite(val){
    this.isfetching = true;
    
    this.service.postSwitchSite({site_id: val}).subscribe(d => {
      this.service.getWebData().subscribe(d => {
        // this.router.navigateByUrl('/dash')
        this.service.setSiteData(d)
        // this.getSite();
        this.isfetching = false;
            window.location.reload();
      })
    })
  }


  isOut;
  logout(){
    this.isOut = true;
  
    let confirm = this.rootService.confirmDialog("Are you sure you want to signout?");

    confirm.afterClosed().subscribe(d => {
      if(d == true){
        // this.adminServ.postLogout().subscribe(d => {
        //   this.adminServ.logOut()
        //   this.router.navigate(['/login'])
        // }, 
        // err => {
         
        // },
        // () => {
        //   this.isOut = false;
        // });
        this.homeS.remove();
        this.router.navigateByUrl("/login") 
      }

      if(d == false){
        this.snackbar.open("Session preserved!", '', {
          duration: 4000
        })
        this.isOut = false;
      }
    })


    
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

    // ///////////////////////////////////////////

    async nightMode($event){
      let cond = $event.target.checked;
      await this.adServ.night.next(cond);
      await sessionStorage.setItem('_night', cond);
    }


    
  

}
