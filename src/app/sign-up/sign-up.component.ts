import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { PasswordValidationDirective } from '../password-validation.directive';
import { User } from '../user';
import {UserServiceService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUp: FormGroup;
  buttonCondition : string;
  public hide:boolean=true;
  constructor( private routed:Router, private build : FormBuilder, private userService : UserServiceService,private toastr: ToastrService){ 
    
  }

  ngOnInit(): void {
    // if(localStorage.getItem("authenticationID")=='false'|| !localStorage.getItem("authenticationID"))
    // {
    //   this.routed.navigate(['./login']);
    // }

    this.signUp = this.build.group({
      userName : ['',[Validators.required]],
      emailId:["",[Validators.required,PasswordValidationDirective(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,{email:true})]],
      password:["",[Validators.maxLength(12),Validators.minLength(6),Validators.required,PasswordValidationDirective(/[a-z]/,{lowerCase:true}),PasswordValidationDirective(/[A-Z]/,{upperCase:true}),PasswordValidationDirective(/[0-9]/, {numaric:true}),PasswordValidationDirective(/[!@#$%^&*(),.?":{}|<>]/,{specialCharacter:true})]],
      confirmPassword :['',[Validators.required]]
    },{validator: this.passwordMatchValidator});
    this.signUp.valueChanges.subscribe(x=>{
      // console.log(x);
      // this.buttonCondition =this.password.value;
    
      // this.buttonCondition=this.password.value?this.signUp.invalid &&!this.confirmPassword.value==this.password.value:this.signUp.invalid &&this.confirmPassword.value==this.password.value;
      // console.log(this.buttonCondition);
    });
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }
  get userName(){return this.signUp.get('userName');}
  get password(){return this.signUp.get('password');}
  get confirmPassword(){return this.signUp.get('confirmPassword');}
  get emailId(){return this.signUp.get('emailId');}
  submitSignUp=()=>{
    if(this.signUp.valid){
      let userData:User = {
        username:this.userName.value,
        email:this.emailId.value,
        password:this.password.value,
      };
      this.userService.addUser(userData).subscribe((data : User)=>{
          console.log(data);
          if(data?.username ==this.userName.value){
            this.toastr.success('Signup Successful');
            this.routed.navigate(['./login']);
          }
        }
        );
    }
  }
  login=()=>{
    this.routed.navigate(['./login']);
  }

}
