import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';

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
  private baseUrl = "http://end.ihifix.com.ng/api/user/";
  // public baseImgUrl = 'http://192.168.1.100:8000/';
  public  baseImgUrl = "https://app.ihifix.com.ng"
  public usersiteinfo: identity_model = {
    
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
        description : '',
        image: '',
        profile: '',
        skills: []
  
    },
    service: {
        enabled: null,
        services: []
    },
    short: '',
    id: null,
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
  public site_color = new BehaviorSubject<any>('');

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
  siteData(){
    return this.web_dommy;
  }

  setSiteData(value){
    this.web_dommy.next(value)
  }

  get no_site(){
    return this.site_status;
  }

  get product(){
    return this.products;
  }

  setProduct(value){
    this.products.next(value)
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
     return this.http.post<any>(this.baseUrl + 'get_posts', {id: this.siteData().value.id}, header);
   }

   postCreatePost(val){
    return this.http.post<any>(this.baseUrl +"create_post", val);
   }

   postUpdatePost(val){
     return (
      val.site_id =  this.siteData().value.id,
      this.http.post<any>(this.baseUrl+"update_post", val)
     )
   }

   postDeletePost(val){ 
    return this.http.post<any>(this.baseUrl+"delete_post", {post_id: val, site_id: this.siteData().value.id});
  }

  postPostCategory(){
    return this.http.post<any>(this.baseUrl+ "get_categories", {site_id: this.siteData().value.id});
  }

   /////////////////////Manage media
   postUploadedImg(){
    return this.http.post<any>(this.baseUrl+"get_media", {id: this.siteData().value.id});
  }

  postuploadImg(val){
    return this.http.post<any>(this.baseUrl+"save_media", val);
  }



  postAdvanceSearch(val){
    return this.http.post<any>(this.baseUrl+"search_post", {site_id: this.siteData().value.id, text: val})
  }


  /**********************
   * E-Store
   */

   postGetProducts(header?){
     return this.http.post<any>(this.baseUrl+ "get_products", {site_id: this.siteData().value.id}, header);
   }

  
  /***************************
   * For Post HttpRequest
   *****************************/

  postPortfolio(val){
    return this.http.post<any>(this.baseUrl + "", val);
  }



  publishService(data){
    return this.http.post<any>(this.baseUrl+'publish', data)
  }

  getAnalysis(){
    return this.http.get<any>(this.baseUrl+"count");
  }
 
   
   


 


 




  /**The services for Verify-Email.component */
  // postRequestToken(val){
  //   return this.http.post<any>(this.baseUrl+"server.php", val);
  // }
 
 

  /**
   * For LocalStorage and Authnetication guard
   */

   getUserToken(){
     return localStorage.getItem('_itk');
   }

   getToken(){
    return localStorage.getItem('_itk') ? true : false;
  }

   getUserConf(){
    return this.http.post<any>(this.baseUrl+"has_activated", {});
  }


   isAllowed(){
     return this.http.post<any>(this.baseUrl + "is_allowed", {id: 1})
   }

   isSiteValid(){
    return this.siteData().value.short == 'cmc' ? true : false;
  }

  







}
