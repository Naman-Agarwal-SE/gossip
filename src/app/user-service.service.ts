import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User,LoginDataSend} from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url=environment.ApiBaseUrl;
  constructor(private http: HttpClient,private toastr: ToastrService) {
   
   }
   addUser=(userData:User):Observable<User>=>{
    let url =`${this.url}/users/signup` ;
    return this.http.post<User>(url,userData).pipe(
      catchError(this.handleError<User>('signup'))
    );
  }
  loginCheck=(userData:LoginDataSend):Observable<any>=>{
    let url =`${this.url}/users/signin`;
    // console.log(environment.name);
    return this.http.post<any>(url,userData).pipe(
      catchError(this.handleError<any>('signup'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error); // log to console instead
      this.toastr.error(error.error['message']);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
