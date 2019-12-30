import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = "home/"

  constructor(
    private http: HttpClient
  ) { }


  recaptcha(val){
    return this.http.post<any>(this.baseUrl+'recaptcha', {recaptcha: val});
  }

}
