import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any>{

  constructor(
    private service: UserserviceService
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{

      let path = route.url[0].path;
      console.log(path)

      // for path: /dash
      if(path === 'dash'){
        return this.service.getWebData();
      }

      //for path: /post
      if(path === 'post'){
        
        return this.service.getAllPost();
      }

      //for path: /manmedia
      if(path === 'manmedia'){
        return this.service.postUploadedImg();
      }

      if(path === 'start' || path === 'theme'){
        return this.service.getTemplate();
      }

      if(path === 'product'){
        return this.service.postGetProducts();
      }

      

      
  }
}
