import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminserviceService } from '../services/adminservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService implements Resolve<any>{

  constructor(
    private adminServ: AdminserviceService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    let path = route.url[0].path;

    if(path === 'websites'){
      return this.adminServ.get_sites();
    }
  }


}
