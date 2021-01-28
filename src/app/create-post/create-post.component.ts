import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { PasswordValidationDirective } from '../password-validation.directive';
import {CreatepostServiceService } from '../createpost-service.service';
// import {Post} from '../Post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postInput: FormGroup;
  constructor( private routed:Router, private build : FormBuilder, private updatePostValue : CreatepostServiceService){ 
    
  }

  ngOnInit(): void {
    if(localStorage.getItem("authenticationID")=='false'|| !localStorage.getItem("authenticationID"))
    {
      this.routed.navigate(['./login']);
    }

    this.postInput = this.build.group({
      description : ['',[Validators.required]],
      url : ['',PasswordValidationDirective(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,{url:true})]
    });
    this.postInput.valueChanges.subscribe(x=>{
      // console.log(x);
    });
  }
  get description(){return this.postInput.get('description');}
  get url(){return this.postInput.get('url');}
  upload(){
    if(this.url.value && !this.url.hasError('url')){
      this.updatePostValue.addPost(this.description.value ,this.url.value);
    }
    else{
      this.updatePostValue.addPost(this.description.value );
    }
    this.routed.navigate(['./feed']);
  }
}
