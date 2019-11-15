import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserserviceService } from './services/userservice.service';
 
@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService{

  constructor(
    private injector: Injector
  ) { }

  handleError(error: HttpErrorResponse){
    console.log(error.error.message);
    return throwError('Server Error! Please try again later.')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      let getToken = this.injector.get(UserserviceService);
      

      let header = new HttpHeaders({
        'Authorization': `Bearer ${getToken.getUserToken()}`
      })

      const clone = req.clone({
        headers: header
      })

      return next.handle(clone).pipe(
        // retry(2),
        catchError(this.handleError)
      );
  }

}
