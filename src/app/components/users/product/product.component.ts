import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { tap } from 'rxjs/operators';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  innerWidth;

  constructor(
    private activeRoute:ActivatedRoute,
    private serv: UserserviceService,
    private prodS: ProductService
  ) { }

  ngOnInit() {
    this.fetchProd();
    this.getCategory();
    // document.body.style.overflow = 'hidden';
    // this.innerWidth = window.innerHeight + "px";
  }


  fetchProd(){
    this.activeRoute.data.subscribe(d => {
      // console.log(d.product)
      this.serv.setProduct(d.product);
    })
  }


  async getCategory(){
    this.prodS.productCategories().subscribe(
      data => {
        if(data.success){
          this.prodS.setCategories(data.categories)
        }
      },
      err => {

      }
    )
  }

}
