import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  productList = [1,2,3,4,5]
  isSearch = false;

  constructor(
    private service: UserserviceService
  ) { }

  ngOnInit() {
  }

  // Filter Table model
  filterTable(val, index){
    // this.sel_category = (val == ''? 'All Categories': val);  
    // let tbody = document.getElementsByTagName('tbody')[0];
    // let tr = tbody.getElementsByTagName('tr');
    // let td;
    // let textval: string;
    // let inputtext = val.toUpperCase();
    // for(var i=0; i<tr.length; i++){
    //   td = tr[i].getElementsByTagName('td')[index]
    //   if(td){
    //     textval = td.innerText.toUpperCase() || td.textContent.toUpperCase();
    //     if(textval.indexOf(inputtext) > -1){
    //       console.log('yes')
    //       tr[i].style.display = "";
    //     }else{
    //       console.log('no');
    //       tr[i].style.display = "none";
    //     }
    //   }
    // }
    
  }



  async advanceSearch(){
  //   await this.service.postAdvanceSearch(this.q).subscribe(
  //     data => {
  //       this.productList = data;
  //       // this.postServ.blogall.next(data);
  //       console.log(this.productList);
  //     },
  //     err => {

  //     }
  //     );
  }

}
