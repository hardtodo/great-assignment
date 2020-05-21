import { Route } from '@angular/compiler/src/core';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../user-management-component/user';
import { Router } from '@angular/router';

function usernameValidator(control:FormControl):{[s:string]:boolean}
{
  if(!control.value.match(/^a/)){
    return{invalidUser:true};
  }
}
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  myForm:FormGroup;//对应我们登陆的表单
  
  username:AbstractControl;//输入用户名的输入控件
  
  password:AbstractControl;//输入密码的输入控件
  
  name$:Observable<string>;

  users$:Observable<User>;

  baseUrl='http://127.0.0.1:8080/';

  currentUser:User;
  
  constructor(private authService:AuthService,private fb:FormBuilder,private httpClient:HttpClient,private router:Router) {
    this.myForm=this.fb.group({
      'username':['',Validators.compose([Validators.required,usernameValidator])],
      'password':['',Validators.compose([Validators.required,Validators.minLength(5)])]
    });
    this.username=this.myForm.controls['username'];
    this.password=this.myForm.controls['password'];
    this.name$=this.username.valueChanges;
    this.username.valueChanges.subscribe(val=>{
      console.log(val);
    });
  
  }

  ngOnInit(): void {
  }

  login(){
    this.httpClient.post(this.baseUrl + 'password',this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          console.log('连接成功 ');
          this.router.navigate(['/management']);
          this.authService.login();
          this.myForm.valid;
        }
        else{
          alert('账号密码错误!');
          this.myForm.invalid;
        }
      }
    );
  }
  onSubmit(value:any){
    console.log(value);
  }

}
