import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { MatDialog } from '@angular/material';
import { AdminService } from '../../admin.service';
import { ViewSiteComponent } from '../../view-site/view-site.component';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  
  sites = [];
  ended  = false;
  total = 0;

  constructor(
    private dialog: MatDialog,
    private adminServ: AdminserviceService,
    private innerServ: AdminService
  ) { }

  ngOnInit() {
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

  getMore(){

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
  
  
      })
      
     console.log(this.innerServ.start)
    }else{
      console.log("no date")

    }



    

   
  }


  viewSite(val){
     let data = this.sites.filter(d => {
      return d.site_id === val
    })
    

    this.dialog.open(ViewSiteComponent, {
      data: data[0],
      panelClass: ['bg-black-light'],
      
    })

  }

  suspend(id, act){
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
      this.getSites()
      console.log(d);
    })
  }


  search_sites(){
    this.adminServ.search_items({word: "henshaw"} ,'search').subscribe(d => {
      console.log(d)
    })
  }


}
