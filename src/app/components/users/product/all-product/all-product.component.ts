import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  productList = [1,2,3,4,5]

  constructor() { }

  ngOnInit() {
  }

}
