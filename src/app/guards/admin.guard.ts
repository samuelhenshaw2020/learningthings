import { Injectable, OnInit } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminserviceService } from '../services/adminservice.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private serv: AdminserviceService,
    private snackbar: MatSnackBar,
    private router: Router
  ){
    
  }

 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
    if(!this.serv.getToken()){
      this.router.navigate(['/control'])
      return false
    }

     return this.serv.getToken();
  }

 

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    
    
    return true;
  }


  //functions

  isLoggedIn(): boolean{
    if(this.serv.islogged){
      return true
    } 

    this.snackbar.open("You have not logged in", 'close', {duration: 4000});
    this.router.navigate(['/control']);
    return false;
  }
}
