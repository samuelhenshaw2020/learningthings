import { Injectable, NgZone } from '@angular/core';
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


  constructor(
    private sse: AdminSseService,
    private ngZone: NgZone
  ) { }



  adminSSE(url: string):  Observable<any>{

    
 
   return Observable.create((observer) =>{
     this.ngZone.runOutsideAngular(_=>{
      const eventSource = this.sse.eventSource( url)
      
      eventSource.onmessage = (event)=>{
        this.ngZone.run(_=>{
          observer.next(event)
          console.log(event)
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
