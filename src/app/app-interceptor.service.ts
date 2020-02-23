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
import { HomeService } from './services/home.service';
 
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
    
    if(error.status === 401){
      localStorage.removeItem('_itk');
      window.location.reload();
    }
    // console.log(error);
    return throwError('Unauthorised!.');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<HttpResponse<any>>{

      let getToken = this.injector.get(HomeService);
      
      let header = new HttpHeaders({
        'Authorization': `Bearer ${getToken.retreive()}`
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
