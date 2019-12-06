import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private infiniteScroll = new BehaviorSubject<any>(false);

  constructor() { }

  get infiniteScrolls(){
    return this.infiniteScroll;
  }


}
