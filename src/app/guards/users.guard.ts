import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, UrlSegment, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from '../services/userservice.service';
import { MatSnackBar } from '@angular/material';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate, CanActivateChild, CanLoad {
  status: boolean;
  constructor(
    private router: Router,
    private serv: UserserviceService,
    private snackbar: MatSnackBar
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log(this.serv.getToken())
      // this.perm.
      
      let status;
      if(!this.serv.getToken()){

        this.snackbar.open("You have not logged in", 'close', {duration: 4000});
        this.router.navigate(['/login/signin']);
        this.status = false;

      }else if(this.serv.getToken()){
        this.serv.isAllowed().subscribe(res=>{
          if(res.success){
             status = res.success;
          }else if(!res.success){
            this.snackbar.open("Please login!", 'close', {duration: 4000});
            // this.router.navigate(['/login/signin']);
            status = res.success
          }
        })
      }

      return true;
      // return true;
      
  }
 

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let status;
      // this.serv.getWebData().subscribe(d => {
      //   if(d.success){
      //     status = d.success
      //     return d.success;
      //   }else if(!d.success){
      //     status = d.success;
      //     this.router.navigate(["/dash/overview"]);
      //     this.snackbar.open("You have not created a website! Click the blue button above", "close", {duration: 5000})
      //     return d.success
      //   }
      // })
      // return status ? true : false;
      return true;
  }

 

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      // let status;
      // this.serv.getWebData().subscribe(d => {
      //   if(d.success){
      //     status = d.success
      //     return d.success;
      //   }else if(!d.success){
      //     status = d.success;
      //     // this.router.navigate(["/dash/overview"]);
      //     this.snackbar.open("You have not created a website! Click the blue button above", "close", {duration: 5000})
      //     return d.success
      //   }
      // })
      // return status ? true : false;
      return true;
  }
  
}
