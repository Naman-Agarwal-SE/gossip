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
    // console.log(this.createPost[(this.createPost.length)-1]);
    this.post={
      userName: this.name,
      url : inputUrl? inputUrl: null,
      description : inputDescription,
      likes: 0,
      postId:this.createPost.length?(this.createPost.length)+1:1,
      NamanAgarwal:false,
      GauravSaxena:false
    };
    this.createPost.unshift(this.post);
  }
  getpost(){
    return this.createPost;
  }
  
}
