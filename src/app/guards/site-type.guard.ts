import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from '../services/userservice.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SiteTypeGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private userS: UserserviceService,
    private router: Router,
    private snackbar: MatSnackBar
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // console.log(this.userS.isSiteValid())

      if(this.userS.isSiteValid()){
        this.router.navigateByUrl('/dash');
        // this.snackbar.open("You are on Portfolio site, not Ecommerce", 'close', {duration: 4000})
      }

      return !this.userS.isSiteValid();

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      // console.log(this.userS.isSiteValid())

      if(!this.userS.isSiteValid()){
        this.router.navigateByUrl('/dash');
        // this.snackbar.open("you are on Ecommerce site, not Portfolio", 'close', {duration: 4000})
      }

      return this.userS.isSiteValid();
  }
}
