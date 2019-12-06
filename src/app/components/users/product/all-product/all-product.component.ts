import { Component, OnInit, ElementRef, Injectable } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { ActivatedRoute} from '@angular/router';

import { interval, timer } from 'rxjs';
import { ProductService } from '../product.service';
import { merge, tap, mergeMapTo, mergeAll, concat, map } from 'rxjs/operators';
import { product_model } from './all-product.model';


@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})


export class AllProductComponent implements OnInit {

  productList = [];
  isSearch = false;
  isLoading = false;
  loading = false;
  total = null;
  no_data = false;

  constructor(
    private service: UserserviceService,
    private activeRoute: ActivatedRoute,
    private prodServ: ProductService
  ) {
    
   }

  ngOnInit() {
   
   this.init_fetch();
   
    console.log(this.total) 
  }

  init_fetch(){
    this.service.product.subscribe(d => {
      this.total = d.total;
      this.productList = d.data;
      console.log(d)
      if(d.data.length < 1){
        this.service.postGetProducts().subscribe((nd:any) => {
          this.service.product.next(nd);
         
           
        })
       
      }
    },
    err =>{
       console.log(err)
    })
  }


  

  
  getMore(){

    let nextUrl = this.service.product.value.next_page_url;
    let prevUrl = this.service.product.value.prev_page_url;
    let whereTo = this.service.product.value.current_page;
    let headerOption;

    
      whereTo++;
      if(nextUrl !== null ){
        headerOption = {
          params: {
            'page': String(whereTo)
          }
        }
    
       this.getMore_ext(headerOption); 
       
      }

  }

  getMore_ext(header){
    this.loading = true;
    this.service.postGetProducts(header).subscribe((nd:any) => {
      
      if(nd.next_page_url === null){
        this.no_data = true;
      }

      let newArr = []
     
      newArr.push(...this.productList);
      newArr.push(...nd.data);
      console.log(newArr)

     
      let newProd: product_model = {
        current_page: nd.current_page,
        data: newArr,
        first_page_url: nd.first_page_url,
        from: nd.from,
        last_page: nd.last_page,
        last_page_url: nd.last_page_url,
        next_page_url: nd.next_page_url,
        path: nd.path,
        per_page: nd.per_page,
        prev_page_url: nd.prev_page_url,
        to: nd.to,
        total: nd.total
      }

      this.service.product.next(newProd);

      this.service.product
      .subscribe(d => {
        this.loading = false
        this.productList = d.data;
      })
       
     
    })
  }
  




  // Filter Table model
  filterTable(val, index){
    // this.sel_category = (val == ''? 'All Categories': val); 

    let tbody = document.getElementsByTagName('tbody')[0];
    let tr = tbody.getElementsByTagName('tr');
    let td;
    let textval: string;
    let inputtext = val.toUpperCase();
    for(var i=0; i<tr.length; i++){
      td = tr[i].getElementsByTagName('td')[index]
      if(td){
        textval = td.innerText.toUpperCase() || td.textContent.toUpperCase();
        if(textval.indexOf(inputtext) > -1){
          console.log('yes')
          tr[i].style.display = "";
        }else{
          console.log('no');
          tr[i].style.display = "none";
        }
      }
    }
    
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


