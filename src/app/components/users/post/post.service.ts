import { Injectable } from '@angular/core';
import { post_model, post_data } from './post.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {



  private postall = new BehaviorSubject<any>({}); 
  private categoies = new BehaviorSubject<any>([]);

  isPost = false;

  constructor() { }

  get blogall(){
    return this.postall;
  }
  get category(){
    return this.categoies;
  }



}
