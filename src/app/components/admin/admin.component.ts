import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { LyTheme2 } from '@alyle/ui';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { Router } from '@angular/router';
import { AdminSseService } from './admin-sse.service';
import { AdminService } from './admin.service';
import { MatSnackBar } from '@angular/material';
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

  not = [
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()},
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()},
    {subject: "System upgrade", message: "i am a boy from the house we came from", date: new Date()}
  ]

  not_open = false;

  get width() {
    return this.mini ? MINI : DEFAULT;
  }

  constructor(
    private _theme: LyTheme2,
    private adminServ: AdminserviceService,
    private router: Router,
    private sse: AdminService,
    private snackbar: MatSnackBar,
    private ngZone: NgZone
    ) {

      // ngZone.runOutsideAngular( ()=>{
      //   let token = localStorage.getItem('_token')
      //   this.adminServ.check_token(token).subscribe(s => {
      //     ngZone.run(()=> {
      //       console.log(s)
      //     })
      //   });
      // })

     }

  toggleMini() {
    this.mini = !this.mini;
  }

  ngOnInit() {

      

    this.sse.adminSSE('/home/sse').subscribe(d => {
      console.log(d)
    })


    console.log(this.adminServ.isLoggedIn());
    this.adminServ.postLoggedAdmin().subscribe(
      (data:any) => {
        console.log(data)
        if(data.type === 4){
          // this.name = data.body[.data.admin_name;
        }
      }, 
      (err) => {
        console.log(err)
      }
    );
  }

  ngOnDestroy(){
    this.router.dispose();
  }


  logout(){
    let confirm = window.confirm("Sure to end session?");
    if(confirm){
      this.adminServ.postLogout().subscribe(d => {
        console.log(d)
        this.adminServ.logOut()
        this.router.navigate(['/control'])
      }, 
      err => {
        console.log(err)
      }
      )
    }

    if(!confirm || confirm === undefined){
      this.snackbar.open("Session preserved!", '', {
        duration: 4000
      })
    }
  }



  



}
