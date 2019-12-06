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

  // private 
  private baseUrl = "/user/";
  public baseImgUrl = 'http://192.168.1.100:8000/';
  public usersiteinfo: identity_model = {
    // site_data: {
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
    link: '',
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
    short: '',
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
  
    // },
  
    }
  };
  // public web_site_data: any;

  private web_dommy = new BehaviorSubject<identity_model>(this.usersiteinfo);
  private products: BehaviorSubject<any> = new BehaviorSubject<any>({}); 

  public site_status = false;

  public isProd  = new BehaviorSubject<boolean>(false); 


  
   
  
  


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

  get no_site(){
    return this.site_status;
  }

  get product(){
    return this.products;
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



  /////////user dash

  postGetSiteList(){
    return this.http.get<any>(this.baseUrl+"site_list");
  }

  postSwitchSite(val){
    return this.http.post<any>(this.baseUrl+"switch_site", val)
  }


  /***************************************
   * overview page
   **************************************/

   getWebData(){
     return this.http.get<any>(this.baseUrl + 'get_site');
   }


    /***************************************
   * Site identity
   **************************************/
   postWebIdentityData(val){
     return this.http.post<any>(this.baseUrl + 'update_site', val);
   }


    /****************************************
   * Post component
   **************************************/
   getAllPost(header?){
     return this.http.post<any>(this.baseUrl + 'get_posts', {id: this.siteData.value.site_id}, header);
   }

   postCreatePost(val){
    return this.http.post<any>(this.baseUrl +"create_post", val);
   }

   postUpdatePost(val){
     return (
      val.site_id =  this.siteData.value.site_id,
      this.http.post<any>(this.baseUrl+"update_post", val)
     )
   }

   postDeletePost(val){ 
    return this.http.post<any>(this.baseUrl+"delete_post", {post_id: val, site_id: this.siteData.value.site_id});
  }

  postPostCategory(){
    return this.http.post<any>(this.baseUrl+ "get_categories", {site_id: this.siteData.value.site_id});
  }

   /////////////////////Manage media
   postUploadedImg(){
    return this.http.post<any>(this.baseUrl+"get_media", {id: this.siteData.value.site_id});
  }

  postuploadImg(val){
    return this.http.post<any>(this.baseUrl+"save_media", val);
  }



  postAdvanceSearch(val){
    return this.http.post<any>(this.baseUrl+"search_post", {site_id: this.siteData.value.site_id, text: val})
  }


  /**********************
   * E-Store
   */

   postGetProducts(header?){
     return this.http.post<any>(this.baseUrl+ "get_products", {site_id: this.siteData.value.site_id}, header);
   }

  
  /***************************
   * For Post HttpRequest
   *****************************/

  postPortfolio(val){
    return this.http.post<any>(this.baseUrl + "image.php", val);
  }

 
   
   


 


 




  /**The services for Verify-Email.component */
  postRequestToken(val){
    return this.http.post<any>(this.baseUrl+"server.php", val);
  }
 
 

  /**
   * For LocalStorage and Authnetication guard
   */

   getUserToken(){
     return localStorage.getItem('_token');
   }

   getToken(){
    return localStorage.getItem('_token') ? true : false;
  }

   getUserConf(){
    return this.http.post<any>(this.baseUrl+"has_activated", {});
  }


   isAllowed(){
     return this.http.post<any>(this.baseUrl + "is_allowed", {id: 1})
   }

  







}
