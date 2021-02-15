import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName : string;

  constructor(private routed : Router) { 
    this.userName = JSON.parse( localStorage.getItem("userName")); 
    if(localStorage.getItem("authenticationID")=='false'|| !localStorage.getItem("authenticationID"))
    {
      this.routed.navigate(['./login']);
    }
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.setItem("authenticationID",'false');
    localStorage.setItem('userName','');
    localStorage.setItem('userId','');
    this.routed.navigate(['./login']);
  }
  createPost(){
    this.routed.navigate(['./create-post']);
  }
  home(){
    this.routed.navigate(['./feed']);
  }
  navigate(){
    this.routed.navigate(['./feed']);
  }
}
