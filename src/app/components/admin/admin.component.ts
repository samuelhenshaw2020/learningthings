import { Component, OnInit } from '@angular/core';
import { LyTheme2 } from '@alyle/ui';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { Router } from '@angular/router';

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

export class AdminComponent implements OnInit {

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
    private router: Router
    ) { }

  toggleMini() {
    this.mini = !this.mini;
  }

  ngOnInit() {
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


  logout(){
    this.adminServ.postLogout().subscribe(d => {
      console.log(d)
      localStorage.removeItem('_token');
      this.router.navigate(['/control'])
    }, 
    err => {
      console.log(err)
    }
    )
  }

  



}
