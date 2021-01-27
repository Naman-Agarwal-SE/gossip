import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import{Router} from '@angular/router';
import { PasswordValidationDirective } from '../password-validation.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginInput:FormGroup; 
  private users :object[]=[
    {userName:'Naman Agarwal',email:"namanagarwal@gmail.com",password:"Abcd@1234"},
    {userName:'Gaurav Saxena',email:"gaurav@gmail.com",password:"Abcd@1234"}
  ]
  public authenticationId : boolean;
  constructor(private good: FormBuilder, private routed:Router) {}

  ngOnInit(): void {
    if(localStorage.getItem("authenticationID") && localStorage.getItem("authenticationID")=='true')
    {
      this.routed.navigate(['./feed']);
    }
    this.loginInput=this.good.group({
      emailId:["",[Validators.required,Validators.email]],
      password:["",[Validators.maxLength(12),Validators.minLength(6),Validators.required,PasswordValidationDirective(/[a-z]/,{lowerCase:true}),PasswordValidationDirective(/[A-Z]/,{upperCase:true}),PasswordValidationDirective(/[0-9]/, {numaric:true}),PasswordValidationDirective(/[!@#$%^&*(),.?":{}|<>]/,{specialCharacter:true})]]
    });
    this.loginInput.valueChanges.subscribe(x=>{
      // console.log(x.emailId,x.password);
      let user :object;
      for(user of this.users){
        if(user['email']==x.emailId && user['password']==x.password){
          this.authenticationId=true;
          localStorage.setItem('authenticationID',JSON.stringify(this.authenticationId));
          localStorage.setItem('userName',JSON.stringify(user['userName']));
          // console.log('routed');
          this.routed.navigate(['./feed']);
        }
      }
    })
  }

  get emailId(){return this.loginInput.get('emailId');}
  get password(){return this.loginInput.get('password');}

}