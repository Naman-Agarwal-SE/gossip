import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import{Router, ActivatedRoute} from '@angular/router';
import {CreatepostServiceService} from '../createpost-service.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Post } from '../Post';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

   userName : string;
   allPost : Post[];
   

  constructor(private routed : Router, private postService : CreatepostServiceService ,private route : ActivatedRoute,public dialog : MatDialog) { 
    this.userName = JSON.parse( localStorage.getItem("userName")); 
    if(localStorage.getItem("authenticationID")=='false'|| !localStorage.getItem("authenticationID"))
    {
      this.routed.navigate(['./login']);
    }
  }

  ngOnInit(): void {
    this.allPost=this.postService.getpost();
  }
  openDialog(post: Post){
    if(post.likes!=0){
      let dialogRef=this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(result=>{
        console.log(result);
        if (result == 'true') {
          let index =this.allPost.findIndex(posts=>{return  posts==post;});
          this.allPost.splice(index,1);
        }
      });
    }
    else{
      let index =this.allPost.findIndex(posts=>{return  posts==post;});
      this.allPost.splice(index,1);
    }
  }
  addLike(post:Post){
    let userLike:string;
    userLike=this.userName.replace(/\s/g,'');  
    if(post[userLike]==false){
      post.likes=post.likes + 1;
      post[userLike]=true;
    }
    else{
      post.likes=post.likes -1;
      post[userLike]=false;
    }
  }
  edit(post: Post){
      this.routed.navigate(['/edit-post'],{
        queryParams:{post:btoa(JSON.stringify(post))}
      });

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
