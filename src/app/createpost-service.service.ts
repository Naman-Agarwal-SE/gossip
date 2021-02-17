import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Post} from './Post';
import {postTemp} from './postTemp';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatepostServiceService {
  name:string;
  post: Post;
  // private createPost : Post[]=[];
  url=environment.ApiBaseUrl;
  constructor(private http: HttpClient,private toastr: ToastrService) { }

  addPost=(postId:object)=>{
    let url =`${this.url}/posts/create-post`;
    return this.http.post<any>(url,postId).pipe(
      catchError(this.handleError<any[]>('create-post', []))
    );
  }

  getIp=()=>{
    let url =`https://jsonip.com/`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any[]>('get-Ip', []))
    );
  }
  getCity=(ip:string)=>{
    let url =`https://ipapi.co/${ip}/json/`;
    // console.log(ip);
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any[]>('get-city', []))
    );
  }
  getNewPost=(): Observable<any>=>{
    let url =`${this.url}/posts/get-new-post`;
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError<any[]>('getnewpost', []))
    );
  }

  // addPost(inputDescription : string , inputUrl?: string | null){
  //   this.name = JSON.parse(localStorage.getItem('userName'));
  //   // console.log(this.createPost[(this.createPost.length)-1]);
  //   this.post={
  //     userName: this.name,
  //     url : inputUrl? inputUrl: null,
  //     description : inputDescription,
  //     likes: 0,
  //     postId:this.createPost.length?(this.createPost.length)+1:1,
  //     NamanAgarwal:false,
  //     GauravSaxena:false
  //   };
  //   this.createPost.unshift(this.post);
  // }
  getpost=(): Observable<postTemp[]>=>{
    let url =`${this.url}/posts/get-post`;
    return this.http.get<postTemp[]>(url).pipe(
      catchError(this.handleError<postTemp[]>('getpost', []))
    );
  }
  
  deletePost=(postId:object): Observable<any>=>{
    let url =`${this.url}/posts/delete-post`;
    return this.http.post<any>(url,postId).pipe(
      catchError(this.handleError<postTemp[]>('deletepost', []))
    );
  }

  likePost=(postId:object): Observable<any>=>{
    let url =`${this.url}/posts/like-post`;
    return this.http.post<any>(url,postId).pipe(
      catchError(this.handleError<postTemp[]>('likepost', []))
    );
  }

  editPost=(postId:object): Observable<any>=>{
    let url =`${this.url}/posts/update-post`;
    return this.http.post<any>(url,postId).pipe(
      catchError(this.handleError<postTemp[]>('updatepost', []))
    );
  }
  likedBy=(likeIds:object): Observable<any>=>{
    let url =`${this.url}/posts/likedby-post`;
    return this.http.post<any>(url,likeIds).pipe(
      catchError(this.handleError<postTemp[]>('likedbypost', []))
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
