import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { MatDialog } from '@angular/material';
import { AdminService } from '../../admin.service';
import { ViewSiteComponent } from '../../view-site/view-site.component';
import { AdminMailComponent } from '../../admin-mail/admin-mail.component';
import { interval } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  
  sites = [];
  ended  = false;
  total = 0;
  night;

  constructor(
    private dialog: MatDialog,
    private adminServ: AdminserviceService,
    private innerServ: AdminService,
    private rootServ: AppService
  ) { }

  ngOnInit() {

    this.innerServ.night.subscribe( d => {
      this.night =d;
    })

    this.innerServ.sitesItems.subscribe(d => {
      this.sites = d.message;
      this.total = d.total;
    })
  }

  getSites(){
    let headerOpt = {
      start: 0,
      limit: this.innerServ.sitesItems.value.message.length
    }

    // console.log(this.innerServ.sitesItems.value.message.length)

    this.adminServ.get_sites(headerOpt).subscribe(d => {
      this.innerServ.sitesItems.next(d)
    })

    this.innerServ.sitesItems.subscribe(d => {
      this.sites = d.message;
    })
  }

  isFetching = false;
  getMore(){
    this.isFetching = true;
    if(this.innerServ.sitesItems.value.start <= this.innerServ.sitesItems.value.total){
      this.innerServ.start = this.innerServ.sitesItems.value.start + 2;

      let headerOpt = {
        start: this.innerServ.startNum,
        limit: this.innerServ.limitNum
      }

      this.adminServ.get_sites(headerOpt).subscribe(d => {
      
        let newArr = [];
  
        newArr.push(...this.sites)
        newArr.push(...d.message)
  
        let newSites = {
          message: newArr,
          total: d.total,
          start: d.start,
          limit: d.limit
  
        }
  
        this.innerServ.sitesItems.next(newSites)
  
  
      },
      err => {

      },
      ()=>{
        this.isFetching = false;
      }
      )
      
     console.log(this.innerServ.start)
    }else{
      console.log("no date")

    }

   
  }

  prev;
  sendMail(user) {
 
    this.adminServ.get_user_mail(user).subscribe(async d => {
      console.log(d)

      this.dialog.open(AdminMailComponent, {
        data: { email: d.message[0].user_mail, task: '_target' },
        width: "350px",
        disableClose: true


      })
    },
      err => {
        console.log(err)
      }, () => {
        this.prev = null;
      })
  }


  viewSite(val){
     let data = this.sites.filter(d => {
      return d.site_id === val
    })
    

    this.dialog.open(ViewSiteComponent, {
      data: data[0],
      minWidth: '100%',
      height: '100%',
      
    })

  }

  
  suspend(id, act, index){
    this.prev = index
    if(act ===0){
      act = 1;
    }else if(act === 1){
      act = 0
    }
      
    let info = {
      site_id: id,
      active: act
    }
    this.adminServ.suspendAccount(info)
    .subscribe(d => {
      // this.getSites()
      if(d.success){
        this.sites[index].online = d.active
      }
      console.log(d);
    },
    err => {

    },
    ()=>{
      this.prev = null;
    }
    )}

  isQuery = false;
  async search_sites($event){
    let val = $event.target.value;
    let event: KeyboardEvent = $event;
    

    if($event instanceof KeyboardEvent){
      $event.preventDefault();
      
      if($event.keyCode === 13 ){
        this.isQuery = true;
        this.adminServ.search_items({word: val})
        .subscribe(
          s => {
          this.innerServ.sitesItems.next(s)
        }, 
        err => {
          console.log(err)
        }, 
        ()=> {
          this.isQuery = false;
        })
      }else{
        if(val.length < 10){
          this.rootServ.filterTable(val, 0);
        }
      }

     
      

     
    }

    
  }


  


}
