import { Injectable } from '@angular/core';
import {Post} from './Post';

@Injectable({
  providedIn: 'root'
})
export class CreatepostServiceService {
  name:string;
  post: Post;
  private createPost : Post[]=[];
  constructor() { }

  addPost(inputDescription : string , inputUrl?: string | null){
    this.name = JSON.parse(localStorage.getItem('userName'));
    this.post={
      userName: this.name,
      url : inputUrl? inputUrl: null,
      description : inputDescription,
      likes: 0
    };
    this.createPost.push(this.post);
  }
  getpost(){
    return this.createPost;
  }
  
}
