import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { CreatepostServiceService } from '../createpost-service.service';
import { PasswordValidationDirective } from '../password-validation.directive';
import { Post } from '../Post';
import { postTemp } from '../postTemp';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  private allPost:postTemp[];
  postInput: FormGroup;
  receivedPostData :postTemp;
  constructor( private routed:Router, private build : FormBuilder, private updatePostValue : CreatepostServiceService, private route : ActivatedRoute){ 
    
  }

  ngOnInit(): void {
    this.updatePostValue.getpost().subscribe(data =>{
      this.allPost=data;
    });
    this.route.queryParams.subscribe(params=>{
      this.receivedPostData=JSON.parse(atob(params.post));
      // console.log(this.receivedPostData);
    });
    if(localStorage.getItem("authenticationID")=='false'|| !localStorage.getItem("authenticationID"))
    {
      this.routed.navigate(['./login']);
    }

    this.postInput = this.build.group({
      description : [this.receivedPostData.description,[Validators.required]],
      url : [this.receivedPostData.url,PasswordValidationDirective(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,{url:true})]
    });
    this.postInput.valueChanges.subscribe(x=>{
      // console.log(x);
    });
  }
  get description(){return this.postInput.get('description');}
  get url(){return this.postInput.get('url');}
  update=()=>{
    let editPost={
      _id: this.receivedPostData._id,
      url:this.url.value,
      description:this.description.value
    };
    // console.log(userLike);
    this. updatePostValue.editPost(editPost).subscribe((data) =>{
       console.log(data);
       this.routed.navigate(['./feed']);
    });


    // for(let eachPost of this.allPost)
    // {
    //   // if (eachPost.postId==this.receivedPostData.postId){
    //   //   if(this.url.value && !this.url.hasError('url')){
    //   //     eachPost.url=this.url.value;
    //   //     eachPost.description=this.description.value;
    //   //   }
    //   //   else{
    //   //     eachPost.description=this.description.value;
    //   //   }
    //   // }
    // }
    // if(this.url.value){
    //   let a =this.allPost.findIndex(posts=>{return  posts==this.receivedPostData;});
    //   console.log(a);
    //   console.log(this.allPost[a]);
    //   this.allPost[a].url=this.url.value;
    //   this.allPost[a].description=this.description.value;
    // }
    // else{
    //   let a= this.allPost.findIndex(aa=>{
    //     return aa==this.receivedPostData;
    //   });
    //   this.allPost[a].description=this.description.value;
    // }
    
  }
  backToFeed=()=>{
    this.routed.navigate(['./feed']);
  }
}
