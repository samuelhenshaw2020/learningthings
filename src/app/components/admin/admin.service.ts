import { Injectable, NgZone, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AdminSseService } from './admin-sse.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public start = 0;
  public limit = 2;
  public acc_start =0;
  public acc_limit =2;
  private sites = new BehaviorSubject<any>([]);
  private accounts = new BehaviorSubject<any>([]);
  public night = new BehaviorSubject<boolean>(false);
  


  constructor(
    private sse: AdminSseService,
    private ngZone: NgZone
  ) { 

    // console.log(Boolean(sessionStorage.getItem('_night')))

    //set dark mode using sessionStorage
    if(this.getNight() && sessionStorage.getItem('_night') !== undefined){
      let cond = sessionStorage.getItem('_night') == 'true' ? true : false;
      this.night.next(cond);
    }

    //set dark mode using time
    if(!this.getNight()){
      let date = new Date();

      if((date.getHours() >= 19 && date.getHours() <= 24) || date.getHours() >= 1 && date.getHours() <= 6 ){
        this.night.next(true);
        sessionStorage.setItem('_night', String(true));
      }

      if((date.getHours() > 6  && date.getHours() < 19) ){
        this.night.next(false);
        sessionStorage.setItem('_night', String(false));
      }
    }

    
  }


  getNight(): boolean {
    return !!sessionStorage.getItem('_night');
  }

 



  adminSSE(url: string):  Observable<any>{

   return Observable.create((observer) =>{
     this.ngZone.runOutsideAngular(_=>{
      const eventSource = this.sse.eventSource( url)
      
      eventSource.onmessage = (event)=>{
        this.ngZone.run(_=>{
          observer.next(event)
        }) 
      }

      eventSource.onerror = (err) => {
        this.ngZone.run(_=>{
          observer.next(err)
          console.log(err)
        })
      }

     })
      

    });

  }


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

  get account(){
    return this.accounts;
  }

  get accStart(){
    return this.acc_start;
  }

  get accLimit(){
    return this.acc_limit;
  }
}
