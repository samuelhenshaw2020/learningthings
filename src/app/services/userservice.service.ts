import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry, share, delay, tap, map } from 'rxjs/operators';
import { identity_model } from '../components/users/webeditor/web.model';

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
  public usersiteinfo: identity_model = {
    site_data: {
      about: {
        enabled: null,
        about: ''
    },
    business_name: '',
    color: '',
    contact: {
        address: '',
        email: '',
        enabled: null,
        phone: ''
    },
    description: '',
    gallery: {
        enabled: null,
        gallery: []
    },
    header_image: '',
    header_title: '',
    logo: '',
    mission: {
      enabled: null,
      mission: ''
        
    },
    portfolio: {
        description: '',
        image: '',
        profile: '',
        skills: []
  
    },
    service: {
        enabled: null,
        services: []
    },
    site_id: null,
    social_media: {
        enabled: null,
        handles: []
    },
    template_id: null,
    user_id: null,
    vission: {
        enabled: null,
        vission: ''
  
    },
  
    }
  };
  // public web_site_data: any;

  public web_dommy = new BehaviorSubject<identity_model>(this.usersiteinfo);
  
   
  
  


  constructor(
    private http: HttpClient
  ) {
    // this.web_dommy.value
   }
  ////////////////////////////////


  /*************************
   * Getter and setter
   *************************/
  get siteData(){
    return this.web_dommy;
  }

 

 

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



  //  getAllSiteInfo(){
  //   return this.http.get<any>(this.baseUrl+'naipod.json');
  //  }

  //  getUserInfo(): Observable<Object>{
  //    return this.http.get(this.baseUrl+ 'naipod.json');
  //  }

  //  getIsEmailActive(){
  //   return this.http.get<any>(this.baseUrl+"data.php");
  // }




  /***************************************
   * Dashboard services
   **************************************/

   //overview page

   getWebData(){
     return this.http.get<any>(this.baseUrl + 'get_site');
   }


   //////Site identity////////
   postWebIdentityData(val){
     return this.http.post<any>(this.baseUrl + 'update_site', val);
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
