import { Directive, HostListener } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { ProductService } from '../components/users/product/product.service';

@Directive({
  selector: '[appScrollProd]'
})
export class ScrollProdDirective {

  @HostListener('scroll') onScroll(){
    // if(window.location.pathname === "/dash/product/all"){
    //   let g = (document.getElementById('infini') as any).getBoundingClientRect();
    //   console.log(Math.floor(g.top))
    //   console.log(document.body.scrollHeight)
    //   if(Math.floor(g.top) < Math.floor(document.body.scrollHeight)){
    //     (document.getElementById('infini') as any).hidden = false;
    //     console.log("///////////////////////////////")
    //     this.serv.infiniteScrolls.next(true)
        
    //   }else{
    //     this.serv.infiniteScrolls.next(false);
    //   }
    // }
    console.log(67464)
  }

  constructor(
    private serv: ProductService
  ) { }

  

}
