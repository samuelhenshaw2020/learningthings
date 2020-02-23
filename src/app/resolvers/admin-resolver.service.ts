import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminserviceService } from '../services/adminservice.service';
import { AdminService } from '../components/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService implements Resolve<any>{

  constructor(
    private adminServ: AdminserviceService,
    private innerServ: AdminService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    let path = route.url[0].path;

    if(path === 'websites'){
      let headerOpt = {
        start: 0,
        limit: this.innerServ.limitNum
      }
      return this.adminServ.get_sites(headerOpt);
    }

    if(path === 'pending'){
      return this.adminServ.pending_acc();
    }

    if(path === "accounts"){
      let headerOpt = {
        start: 0,
        limit: this.innerServ.accLimit
      }
      return this.adminServ.get_users(headerOpt);
    }

    if(path === 'admin'){
      return this.adminServ.isLoggedIn();
    }

  }


}
