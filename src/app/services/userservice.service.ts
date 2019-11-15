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
  ////////////////////////////////


  /*************************
   * Validate email
   *************************/

   
  getName(){
    return this.http.get<any>(this.baseUrl+"get_name");
  }

  getOTP(){
    return this.http.get<any>(this.baseUrl+"resend_otp");
  }

  PostVerifyToken(val){
    return this.http.post<any>(this.baseUrl+"validate_otp", val);
  }
  //////////////////////////////////


  /**
   * Password Recovery
   */
  postCheckEmail(val){
    return this,this.http.post<any>(this.baseUrl+'check_email', val);
  }

  postValidateOTP(val){
    return this.http.post<any>(this.baseUrl+"validate_pass_otp", val);
  }

  
  postResetPWD(val){
    return this.http.post<any>(this.baseUrl+"new_pass", val);
  }
  ///////////////////////////


  /**
   * for sign in
   */
  postSignin(val) {
    return this.http.post<any>(this.baseUrl + "login", val);
  }


  /*************************
   * for signup
   **************************/

  postRegister(val) {
    return this.http.post<any>(this.baseUrl + "signup", val);
  }
  ////////////////////////////

  /***
   * For get started
   */

  getTemplate(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "get_template");
  }

  postGetstated(val) {
    return this.http.post<any>(this.baseUrl + "create_site", val);
  }



   getAllSiteInfo(){
    return this.http.get<any>(this.baseUrl+'naipod.json');
   }

   getUserInfo(): Observable<Object>{
     return this.http.get(this.baseUrl+ 'naipod.json');
   }

   getIsEmailActive(){
    return this.http.get<any>(this.baseUrl+"data.php");
  }



  
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


 


 




  /**The services for Verify-Email.component */
  postRequestToken(val){
    return this.http.post<any>(this.baseUrl+"server.php", val);
  }

 

  /**
   * For LocalStorage
   */

   getUserToken(){
     return localStorage.getItem('_token');
   }

  







}
