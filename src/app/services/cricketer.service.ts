import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { filter, concatMap, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { config } from '../config';
import { Cricketer } from '../models/cricketer';

@Injectable({
  providedIn: 'root'
})
export class CricketerService {

  private cricketers = new BehaviorSubject<Array<Cricketer>>([]);
  getCricketers = this.cricketers.asObservable();
  
  constructor(private http: HttpClient) { }
  // login(loginData: any) {
  //   console.log("api")
  //   return this.http.get(`${config.apiUrl}/login?email=` + loginData.email)
  //     .pipe(
  //       concatMap((data: any) => {
  //         if (data.length === 0)
  //           return this.http.post(`${config.apiUrl}/login`, loginData);
  //         else if (data[0].password === loginData.password) {
  //           return data;
  //         }
  //         else
  //           return throwError("Invalid credentials");
  //       })
  //     )
  // }

  updateCricketers(cricketers: Array<Cricketer>) {
    this.cricketers.next(cricketers);
  }
  getAllCricketers() {
    return this.http.get(`${config.apiUrl}/cricketers`);
  }
  saveCricketer(cricketer: any, userId: number) {
    return this.http.post(`${config.apiUrl}/cricketers?userId=${userId}`, {
      ...cricketer
    })
  }
  updateCricketer(cricketer) {
    return this.http.put(`${config.apiUrl}/cricketers/` + cricketer.id + `/`, cricketer)
  }
  deleteCricketer(userId,cricketerId) {
    return this.http.delete(`${config.apiUrl}/cricketers?userId=${userId}&cricketerId=${cricketerId}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
