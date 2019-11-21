import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any>{

  constructor(
    private service: UserserviceService
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    let view;
    
  
      view = this.service.getWebData();
  
    // console.log(view)
    return view;
  }
}
