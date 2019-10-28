import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface signin {
  email: string,
  pwd: string
}

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseUrl = "/ihifixtest/";


  constructor(
    private http: HttpClient
  ) { }


  /**
   * For Post HttpRequest
   */
  postGetstated(val) {
    return this.http.post<any>(this.baseUrl + "server.php", val)
      .pipe(
        catchError(this.handleError),
        retry(2)
      )
  }

  postSignin(val) {
    return this.http.post<any>(this.baseUrl + "server.php", val)
      .pipe(
        catchError(this.handleError)
      )
  }

  postRegister(val) {
    return this.http.post<any>(this.baseUrl + "server.php", val)
      .pipe(
        catchError(this.handleError)
      )
  }


  /**
   * For Handling Error event
   */

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //  front end error
      console.error('An error occured: ' + error.error.message);
    } else {
      // backend error
      console.error(`an error with status code ${error.status} and the body message is ${error.error}`);
    }

    return throwError('Server Error! Please try again later.')
  }







}
