import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from '../services/userservice.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private serv: UserserviceService,
    private snackbar: MatSnackBar,
    private router: Router
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let status = false;
      // console.log()
      // this.serv.getUserConf().subscribe(d => {
      //    if(d.confirmation  === 0){
      //      status = false;
      //      this.router.navigate(["/login/verify"])
      //      this.snackbar.open("You have not verified your account!", 'close', {duration:5000})
      //    }else if(d.confirmation  === 1){
      //      status = true
      //    }
      // });

      // return status ? true : false;
      return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
