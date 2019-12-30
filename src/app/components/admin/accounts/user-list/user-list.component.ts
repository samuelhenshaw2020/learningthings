import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user_acc = [];
  total =0;

  constructor(
    private adminServ: AdminserviceService,
    private innerServ: AdminService
  ) { }

  ngOnInit() {
    this.innerServ.account.subscribe(
      d => {
        this.user_acc = d.message;
        this.total = d.total
        console.log(d)
      },
      err => {
        console.log(err)
      }
    )
  }

  getMore(){

    if(this.innerServ.account.value.start <= this.innerServ.account.value.total){
      this.innerServ.acc_start = this.innerServ.account.value.start + 2;

      let headerOpt = {
        start: this.innerServ.acc_start,
        limit: this.innerServ.acc_limit
      }

      this.adminServ.get_users(headerOpt).subscribe(d => {
      
        let newArr = [];
  
        newArr.push(...this.user_acc)
        newArr.push(...d.message)
  
        let newSites = {
          message: newArr,
          total: d.total,
          start: d.start,
          limit: d.limit
  
        }
  
        this.innerServ.account.next(newSites)
  
  
      })
      
     console.log(this.innerServ.acc_start)
    }else{
      console.log("no date")

    }

   
  }

}
