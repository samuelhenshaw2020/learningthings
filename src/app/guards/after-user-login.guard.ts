import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HomeService } from '../services/home.service';

@Injectable({
  providedIn: 'root'
})
export class AfterUserLoginGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private homeS: HomeService,
    // private authS: AuthServiceService,
    private router: Router,
    private snackbar:MatSnackBar
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // if(!this.homeS.isLoggedIn()){
      //   this.router.navigateByUrl('/login');
      //   this.snackbar.open("Unauthorized user! Please login", "close", {
      //     duration: 5000
      //   })
      // }
     
      // console.log(this.homeS.isLoggedIn())

      return this.homeS.isLoggedIn();
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
}
