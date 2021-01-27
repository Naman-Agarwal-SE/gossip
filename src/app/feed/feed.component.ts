import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {CreatepostServiceService} from '../createpost-service.service';
import { Post } from '../Post';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

   userName : string;
   allPost : Post[];

  constructor(private routed : Router, private postService : CreatepostServiceService) { 
    this.userName = JSON.parse( localStorage.getItem("userName")); 
    if(localStorage.getItem("authenticationID")=='false'|| !localStorage.getItem("authenticationID"))
    {
      this.routed.navigate(['./login']);
    }
  }

  ngOnInit(): void {
    this.allPost=this.postService.getpost();
    for(let p of this.allPost){

      console.log(p.url);
    }
  }
}
