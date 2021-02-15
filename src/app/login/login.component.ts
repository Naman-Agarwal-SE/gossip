import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import{Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidationDirective } from '../password-validation.directive';
import { LoginDataSend } from '../user';
import {UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginInput:FormGroup; 
  // private users :object[]=[
  //   {userName:'Naman Agarwal',email:"namanagarwal@gmail.com",password:"Abcd@1234"},
  //   {userName:'Gaurav Saxena',email:"gaurav@gmail.com",password:"Abcd@1234"}
  // ]
  public authenticationId : boolean;
  public hide :boolean =true;
  constructor(private good: FormBuilder, private routed:Router,private userService : UserServiceService,private toastr: ToastrService) {}

  ngOnInit(): void {
    if(localStorage.getItem("authenticationID") && localStorage.getItem("authenticationID")=='true')
    {
      this.routed.navigate(['./feed']);
    }

    this.loginInput=this.good.group({
      emailId:["",[Validators.required,Validators.email]],
      password:["",[Validators.maxLength(12),Validators.minLength(6),Validators.required,PasswordValidationDirective(/[a-z]/,{lowerCase:true}),PasswordValidationDirective(/[A-Z]/,{upperCase:true}),PasswordValidationDirective(/[0-9]/, {numaric:true}),PasswordValidationDirective(/[!@#$%^&*(),.?":{}|<>]/,{specialCharacter:true})]]
    });
    
    this.loginInput.valueChanges.subscribe(data=>{
      // console.log(x.emailId,x.password);
      let loginData:LoginDataSend = {
        email:data.emailId,
        password:data.password,
      };
      this.userService.loginCheck(loginData).subscribe((dataGet:any)=>{
          if(dataGet?.success){
            this.authenticationId=true;
            localStorage.setItem('authenticationID',JSON.stringify(this.authenticationId));
            localStorage.setItem('userName',JSON.stringify(dataGet.userData.username));
            localStorage.setItem('userId',JSON.stringify(dataGet.userData._id));
            this.toastr.success('Login Successful');
            this.routed.navigate(['./feed']);
          }
        }
      );
    })
  }
  signUp=()=>{
    this.routed.navigate(['./signUp']);
  };
  get emailId(){return this.loginInput.get('emailId');}
  get password(){return this.loginInput.get('password');}

}