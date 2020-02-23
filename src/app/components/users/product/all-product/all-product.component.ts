import { Component, OnInit, ElementRef, Injectable } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { ActivatedRoute} from '@angular/router';

import { interval, timer } from 'rxjs';
import { ProductService } from '../product.service';
import { merge, tap, mergeMapTo, mergeAll, concat, map } from 'rxjs/operators';
import { product_model } from './all-product.model';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material';


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
  imageurl;
  categories;
  prev = null;

  constructor(
    private service: UserserviceService,
    private activeRoute: ActivatedRoute,
    private prodServ: ProductService,
    private rootS: AppService,
    private snackbar: MatSnackBar

    
  ) {
    this.imageurl =prodServ.imageurl;
   }

  ngOnInit() {
   
   this.init_fetch();
   
   this.getCategory()
  }

  getCategory(){
    this.prodServ.categories.subscribe(
      data => {
        this.categories = data;
        // console.log(data)

      }
    )
  }

  fetching = false;
  init_fetch(){
    this.fetching= true;
    this.service.product.subscribe(d => {
      this.total = d.product.total;
      this.productList = d.product.data;
     
      this.fetching = false

    },
    err =>{
       this.fetching = false;
    })
  }


  addProduct(){
    this.rootS.addProduct();
  }

  viewProd($event: MouseEvent, id){
    $event.preventDefault();

    let select_prod: Array<any> = this.productList.filter(f => {
      return f.product_id == id
    })[0]

    this.prodServ.view_prod(select_prod);
  }

  trackByIndex(index, prod){
    // console.log(prod.product_id)
    return prod.product_id;
  }

  deleteProd(prod){

    this.rootS.confirmDialog(`Do you want to delete product: ${prod.product_name}`).afterClosed().subscribe(
      condition => {
        if(condition === true){
          this.initiateDelete(prod)
        }else{
          this.prev = null;
        }
      }
    )
  }

  initiateDelete(prod){
    
    let info = {
      product_id: prod.product_id,
      site_id: this.service.siteData().value.id
    }
   
    this.prodServ.delProd(info).subscribe(
      data => {
        this.prev = null;
        this.snackbar.open(data.message, 'close', {duration: 5000, panelClass: ['text-primary', 'bg-light']})
        if(data.success == true){
          let index =this.productList.indexOf(prod);
          this.productList.splice(index, 1);
        }
      }, 
      err => {
        this.prev = null;

      }
    );
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
      // console.log(newArr)

     
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
          // console.log('yes')
          tr[i].style.display = "";
        }else{
          // console.log('no');
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


