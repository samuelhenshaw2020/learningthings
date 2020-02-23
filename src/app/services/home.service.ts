import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { DeleteBadTokenComponent } from '../dialog/delete-bad-token/delete-bad-token.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = "/api/home/"
  user_base = '/api/user/'

  // private DOMAIN_NAME = "https://app.ihifix.com.ng"
  private DOMAIN_NAME = "http://end.ihifix.com.ng";
  // private DOMAIN_NAME = "http://192.168.1.101:4200";
  protected origin = {
      login: `${this.DOMAIN_NAME}/api/user/login`,
      signup: `${this.DOMAIN_NAME}/api/user/login`,
  };

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
  ) { }


  recaptcha(val){
    return this.http.post<any>(this.baseUrl+'recaptcha', {recaptcha: val});
  }


  googleSocialSignup(val){
    return this.http.post<any>(this.user_base + 'google_signup', {id_token: val})
  }

  googleSocialLogin(val){
    return this.http.post<any>(this.user_base + 'google_login', {id_token: val})
  }


    /**
   * Token functions
   */
  handle(token){
    this.set(token);
  }

  private set(token){
    localStorage.setItem('_itk', token);
  }

  retreive(){
    return localStorage.getItem('_itk');
  }

  present(){
    return !!localStorage.getItem('_itk');
  }

  remove(){
    localStorage.removeItem('_itk');
  }

  isValid(){
    const token = this.retreive();
    if(token){
      const payload = this.payload(token);
      console.log(payload)
      if(payload){
         return (Object.values(this.origin).indexOf(payload.iss)) > -1 ? true : false;
      }
    }

    return false;
  }

  payload(token){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload){

    try {
      const decodePayload = atob(payload);
      // console.log(decodePayload);
      return JSON.parse(atob(payload));

    } catch (error) {
      this.snackbar.openFromComponent(DeleteBadTokenComponent);
    }
    
  }

  isLoggedIn(){
    return this.isValid();
  }

}
