import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first, last, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  private baseUrl = "admin/";

  constructor(
    private http: HttpClient
  ) { }

  /**
   * admin login part
   */

   Postlogin(val){
    return this.http.post<any>(this.baseUrl+ 'login', val, {observe: 'events', reportProgress: true})
   }

   postLoggedAdmin(){
     return this.http.get<any>(this.baseUrl+"logged_admin", {observe: 'events', reportProgress: true});
   }

   postLogout(){
     return this.http.get<any>(this.baseUrl+"logout");
   }

   getToken(){
    return localStorage.getItem('_token') ? true : false;
  }

  send_email(val){
    return this.http.post<any>(this.baseUrl+'send_email', val, {observe: 'events', reportProgress: true})
  }

  get_sites(){
    return this.http.get<any>(this.baseUrl+'get_sites');
  }

  isLoggedIn(){
    
    return this.http.get<any>(this.baseUrl+"logged_admin")

  }

  logOut(){
    localStorage.removeItem('_token');
  }

}
