import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import{Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginInput:FormGroup; 
  private users :object[]=[
    {email:"namanagarwal@gmail.com",password:"Abcd@1234"},
    {email:"alluser@gmail.com",password:"Abcd@1234"}
  ]
  public authenticationId : boolean;
  constructor(private good: FormBuilder, private routed:Router) { }

  ngOnInit(): void {
    this.loginInput=this.good.group({
      emailId:["",[Validators.required,Validators.email]],
      password:["",[Validators.maxLength(12),Validators.minLength(6),Validators.required]]
    });
    this.loginInput.valueChanges.subscribe(x=>{
      // console.log(x.emailId,x.password);
      let ar :object;
      for(ar of this.users){
        if(ar['email']==x.emailId && ar['password']==x.password){
          this.authenticationId=true;
          localStorage.setItem('authenticationID',JSON.stringify(this.authenticationId));
          // console.log('routed');
          this.routed.navigate(['./feed']);
        }
      }
    })
  }

  get emailId(){return this.loginInput.get('emailId');}
  get password(){return this.loginInput.get('password');}

}
