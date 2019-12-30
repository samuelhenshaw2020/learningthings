import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first, last, switchMap, delay, tap, endWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  private baseUrl = "admin/";
  private isLoggedInStatus = false;
  private isTokenStatus = false;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * admin login part
   */

   Postlogin(val){
    return this.http.post<any>(this.baseUrl+ 'login', val, {observe: 'events', reportProgress: true})
    // .pipe(
    //   delay(1000),
    //   tap((t:any) => {
    //     if(t.type ===4 ){
    //       console.log(t.body.success)
    //       if(t.body.success){
    //           this.isLoggedInStatus = true;
    //       }

    //       if(!t.body.success){
    //         this.isLoggedInStatus = false;
    //       }
    //     }
    //   })
    // )
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

  get_sites(header){
    return this.http.post<any>(this.baseUrl+'get_sites', header);
  }

  suspendAccount(val){
    return this.http.post<any>(this.baseUrl + "acc_suspend", val);
  }

  search_items(val, endpoint){
    return this.http.post<any>(this.baseUrl+ endpoint, val);
  }

  pending_acc(){
    return this.http.get<any>(this.baseUrl+'pending');
  }

  get_user_mail(user){
   return  this.http.post<any>(this.baseUrl+'get_mail', {user_id: String(user)})
  }
  
  get_users(val){
    return this.http.post<any>(this.baseUrl+'get_users', val);
  }

  get_single_user(val){
    return this.http.post<any>(this.baseUrl+"single_user", {user_id: String(val)})
  }

  approve_site(id, code){
    return this.http.post<any>(this.baseUrl+"approve_site", {site_id: String(id), verify: String(code)})
  }

 check_token(val){
    return this.http.post<any>(this.baseUrl + 'check_token', {token: val})
 }

  

  isLoggedIn(){
    return this.http.get<any>(this.baseUrl+"logged_admin");
  }

 
  logOut(){
    this.isLoggedInStatus = false;
    localStorage.removeItem('_token');
  }

  get islogged(){
    console.log(this.isLoggedInStatus)
    return this.isLoggedInStatus;
  }

}
