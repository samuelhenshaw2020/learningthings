import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private activeRoute:ActivatedRoute,
    private serv: UserserviceService
  ) { }

  ngOnInit() {
    this.fetchProd();
  }


  fetchProd(){
    this.activeRoute.data.subscribe(d => {
      console.log(d.product)
      this.serv.product.next(d.product);
    })
  }

}
