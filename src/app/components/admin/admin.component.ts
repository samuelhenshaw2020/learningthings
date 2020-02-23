import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { LyTheme2 } from '@alyle/ui';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { Router } from '@angular/router';
import { AdminSseService } from './admin-sse.service';
import { AdminService } from './admin.service';
import { MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/app.service';
// import {SwPush} from 'servi'';


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
const MINI = '90px over@XSmall';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit{

  
  readonly classes = this._theme.addStyleSheet(STYLES);
  mini = true;
  name = null;
  night;
  
  

  not = [
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()},
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()},
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()}
  ]

  
  not_open = false;
  innerWidth;

  get width() {
    return this.mini ? MINI : DEFAULT;
  }

  constructor(
    private _theme: LyTheme2,
    private adminServ: AdminserviceService,
    private router: Router,
    private adServ: AdminService,
    private snackbar: MatSnackBar,
    private ngZone: NgZone,
    private rootService: AppService

    
    ) {

      
      this.innerWidth = window.innerHeight + "px";
      
      // ngZone.runOutsideAngular( ()=>{
      //   let token = localStorage.getItem('_token')
      //   this.adminServ.check_token(token).subscribe(s => {
      //     ngZone.run(()=> {
      //       console.log(s)
      //     })
      //   });
      // })
      this.adServ.night.subscribe(d => {
        this.night = d;
      })

     }

  toggleMini() {
    this.mini = !this.mini;
  }

  async nightMode($event){
    let cond = $event.target.checked;
    await this.adServ.night.next(cond);
    await sessionStorage.setItem('_night', cond);
  }

  text: string;
  isOut = false;

  ngOnInit() {

    window.onresize = ()=>{
      this.innerWidth = window.innerHeight + 'px';
    }

    document.body.style.overflow = 'hidden';

    
    

    // this.adServ.adminSSE('/s').subscribe(chunk => {
    //    let chunk = JSON.parse(d.data);
    //   this.text += chunk.data;
    //    console.log(this.text);
    //   console.log(chunk.data)

    // })


    
    
  }

  ngOnDestroy(){
    // this.router.dispose();
  }


  logout(){
    this.isOut = true;
    // let confirm = window.confirm("Sure to end session?");
    let confirm = this.rootService.confirmDialog("Are you sure you want to signout?");

    confirm.afterClosed().subscribe(d => {
      if(d == true){
        this.adminServ.postLogout().subscribe(d => {
          console.log(d)
          this.adminServ.logOut()
          this.router.navigate(['/control'])
        }, 
        err => {
          console.log(err)
        },
        () => {
          this.isOut = false;
        }
        )
      }

      if(d == false){
        this.snackbar.open("Session preserved!", '', {
          duration: 4000
        })
        this.isOut = false;
      }
    })


    
  }



  



}
