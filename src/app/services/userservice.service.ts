import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import { catchError, retry, share, delay, tap, map } from 'rxjs/operators';

interface signin {
  email: string,
  pwd: string 
}

interface reqOTP{
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseUrl = "/user/";
  public usersiteinfo: Subject<any>[];


  constructor(
    private http: HttpClient
  ) { }


  /*************************
   * Get Request for OTP
   *************************/

   
  getName(){
    return this.http.get<any>(this.baseUrl+"get_name");
  }

  getOTP(){
    return this.http.get<any>(this.baseUrl+"resend_otp");
  }

  /**
   * 
   */



   getAllSiteInfo(){
    return this.http.get<any>(this.baseUrl+'naipod.json');
   }

   getUserInfo(): Observable<Object>{
     return this.http.get(this.baseUrl+ 'naipod.json');
   }

   getIsEmailActive(){
    return this.http.get<any>(this.baseUrl+"data.php");
  }

  

  // postRequestOTP(val){
  //   return this.http.post<reqOTP>(this.baseUrl+"", val);
  // }


  
  /***************************
   * For Post HttpRequest
   *****************************/

  postPortfolio(val){
    return this.http.post<any>(this.baseUrl + "image.php", val);
  }

   postAdvanceSearch(val){
    return this.http.post<any>(this.baseUrl+"data.php", val);
  }
   
    postImageUpload(val){
      return this.http.post(this.baseUrl+"image.php", val);
    }


  postGetstated(val) {
    return this.http.post<any>(this.baseUrl + "server.php", val);
  }

  postSignin(val) {
    return this.http.post<any>(this.baseUrl + "login", val);
  }

  postRegister(val) {
    return this.http.post<any>(this.baseUrl + "signup", val);
  }

 

  postValidateOTP(val){
    return this.http.post<any>(this.baseUrl+"validate_otp", val);
  }

  postResetPWD(val){
    return this.http.post<any>(this.baseUrl+"server.php", val);
  }

  /**The services for Verify-Email.component */
  postRequestToken(val){
    return this.http.post<any>(this.baseUrl+"server.php", val);
  }

  PostVerifyToken(val){
    return this.http.post<any>(this.baseUrl+"validate_otp", val);
  }


  /**
   * Get functions for global use
   */

   getUserToken(){
     return localStorage.getItem('_token');
   }

  







}
