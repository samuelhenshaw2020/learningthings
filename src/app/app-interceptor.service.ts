import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpProgressEvent, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { UserserviceService } from './services/userservice.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PostService } from './components/users/post/post.service';
import { AdminserviceService } from './services/adminservice.service';
import { DropListRef } from '@angular/cdk/drag-drop';
 
@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService{



  constructor(
    private injector: Injector,
    private router:  Router,
    private serv: AdminserviceService
    
  ) { }

  handleError(error: HttpErrorResponse){
    // let admin = this.injector.get(AdminserviceService);
    if(error.status === 401){
      this.serv.logOut();
      window.location.reload(true);
    }
    console.log(error.error.message);
    return throwError('Server Error! Please try again later.');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<HttpResponse<any>>{

      let getToken = this.injector.get(UserserviceService);
      // let adm = this.injector.get(AdminserviceService);
      

      let header = new HttpHeaders({
        'Authorization': `Bearer ${getToken.getUserToken()}`
      })

      let clone;
  
      clone = req.clone({
        headers: header
      });
    

    

      return next.handle(clone).pipe(
        // retry(2),
        
        catchError(this.handleError), 
      );
  }


}
