import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import{Router, ActivatedRoute} from '@angular/router';
import {CreatepostServiceService} from '../createpost-service.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { LikedbyDialogComponent } from '../likedby-dialog/likedby-dialog.component';
import { Post } from '../Post';
import { postTemp } from '../postTemp';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

   userName : string;
   allPost : postTemp[];
    userId:number;
    timer:any = 0;
    delay = 200;
    prevent = false;

   

  constructor(private routed : Router, private postService : CreatepostServiceService ,private route : ActivatedRoute,public dialog : MatDialog) { 
    this.userName = JSON.parse( localStorage.getItem("userName")); 
    this.userId = JSON.parse( localStorage.getItem("userId"));
    if(localStorage.getItem("authenticationID")=='false'|| !localStorage.getItem("authenticationID"))
    {
      this.routed.navigate(['./login']);
    }
  }

  ngOnInit(): void {
    this.postService.getpost().subscribe((data : postTemp[]) =>{
      // console.log(data);
      this.allPost=data;
    });
  }
  openDialog=(post: postTemp)=>{
    let postId ={_id:post._id};
    if(post.totalLikes!=0){
      let dialogRef=this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(result=>{
        // console.log(result);
        if (result == 'true') {
          this.postService.deletePost(postId).subscribe((data) =>{
            this.postService.getpost().subscribe((data : postTemp[]) =>{
              // console.log(data);
              this.allPost=data;
            });
            // console.log(data);
          });
          // let index =this.allPost.findIndex(posts=>{return  posts==post;});
          // this.allPost.splice(index,1);
        }
      });
    }
    else{
      this.postService.deletePost(postId).subscribe((data) =>{
        this.postService.getpost().subscribe((data : postTemp[]) =>{
          // console.log(data);
          this.allPost=data;
        });
        console.log(data);
      });
    }
  }
  addLike=(post:postTemp)=>{
    let userLike={
      _id: post._id,
      likedBy:this.userId
    };
    // console.log(userLike);
    this.postService.likePost(userLike).subscribe((data) =>{
      post.totalLikes=data.totalLikes;
      post.likedBy=data.likedBy;
      // console.log(data);
    });
    // userLike=this.userName.replace(/\s/g,'');  
    // if(post[userLike]==false){
    //   post.likes=post.likes + 1;
    //   post[userLike]=true;
    // }
    // else{
    //   post.likes=post.likes -1;
    //   post[userLike]=false;
    // }
  }
  edit=(post: postTemp)=>{
      this.routed.navigate(['/edit-post'],{
        queryParams:{post:btoa(JSON.stringify(post))}
      });

  }
  singleClick(post:postTemp): void{
    this.timer = 0;
    this.prevent = false;
    let delay = 400;

    this.timer = setTimeout(() => {
      if(!this.prevent){
        this.addLike(post);
      }
    }, delay);

  }

  doubleClick(post:postTemp): void{
    this.prevent = true;
    clearTimeout(this.timer);
    this.likedByDialog(post);
  }
  likedByDialog(postData:postTemp){
    let dialogRef=this.dialog.open(LikedbyDialogComponent,{data:{
      likedBy:postData.likedBy
    }});
  }
  // delete(post: Post){
  //   if(post.likes!=0){
  //     if (confirm(`do you want to delete the post it has ${post.likes} likes. by deleting you lost post data ?`) == true) {
  //       let index =this.allPost.findIndex(posts=>{return  posts==post;});
  //       this.allPost.splice(index,1);
  //     }
  //   }
  //   else{
  //     let index =this.allPost.findIndex(posts=>{return  posts==post;});
  //     this.allPost.splice(index,1);
  //   }
  // } 
}
