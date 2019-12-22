import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public start = 0;
  public limit = 2;
  private sites = new BehaviorSubject<any>([]);

  constructor() { }

  get startNum(){
    return this.start;
  }

  set startNum(val){
    this.start = val;
  }

  get limitNum(){
    return this.limit;
  }

  set limitNum(val){
    this.limit = val;
  }

  get sitesItems(){
    return this.sites;
  }
}
