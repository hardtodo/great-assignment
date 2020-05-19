import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './user';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm:FormGroup;
  user:AbstractControl;
  id:AbstractControl;
  pay:AbstractControl;
  product$:Observable<Product>;
  baseUrl='http://127.0.0.1:8080/';
  currentUser:Product;

  constructor(private fb:FormBuilder,private httpClient:HttpClient) { 
    this.myForm=this.fb.group({
      'user':[''],
      'pay':[''],
      'id':['']
    });
    this.user=this.myForm.controls['user'];
    this.id=this.myForm.controls['id'];
    this.pay=this.myForm.controls['pay'];
  }

  ngOnInit(): void {
    this.product$ =<Observable<Product>>this.httpClient.get(this.baseUrl + 'product');
  }
  search(){
    if (this.id.value) { 
      this.product$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'product/' + this.id.value);  
    }else {
        this.product$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'product'); }

  }
  add(){
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'product',this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
        }
      }
    );
  }
  select(p:Product){
    this.currentUser=p;
    this.myForm.setValue(this.currentUser);

  }

  delete(){
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }else{
      this.httpClient.delete(this.baseUrl+'product/'+this.currentUser.id).subscribe(
        (val:any)=>{
          if(val.succ){
            alert('删除成功!');
          }
        }
      )
    }
  }
  update(){
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }else{
      this.httpClient.put(this.baseUrl+'product',this.myForm.value).subscribe(
        (val:any)=>{
          if(val.succ){
            alert('修改成功!');
          }
        }
      )
    }
  }

}
