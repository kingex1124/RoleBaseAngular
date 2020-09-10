import { Component, OnInit } from '@angular/core';
import { AccountRegist } from '../models/account-regist.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  SERVER_URL = 'https://localhost:44362/api/AccountAnApi/RegistAccount';

  account: AccountRegist = { } as AccountRegist;

  constructor(private httpClient: HttpClient, private router: Router,
             ) {
    this.initAccountRegist();
  }

  ngOnInit(): void {

  }

  initAccountRegist(){
    this.account.AccountName = '';
    this.account.Password = '';
    this.account.PasswordConfirm = '';
    this.account.UserName = '';
    this.account.Email = '';
    this.account.Phone = '';
    console.log(this.account);
  }

  onRegist(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    })
  };

//     const httpOptions2 = {
//     headers: new HttpHeaders(),
//   params:
//    new HttpParams()
//       .set('UserID', '0')
//       .set('AccountName', this.account.AccountName)
//       .set('Password', this.account.Password)
//       .set('PasswordConfirm', this.account.PasswordConfirm)
//       .set('UserName', this.account.UserName)
//       .set('Email', this.account.Email)
//       .set('Phone', this.account.Phone)
//       .set('Message', this.account.Message)
// };

    console.log(JSON.stringify(this.account));
    this.httpClient.post<any>(this.SERVER_URL,  JSON.stringify(this.account) , httpOptions).subscribe(
      (res) => {
        console.log(res);

        this.account.Message = res.Message;
        if (!res.IsSuccessed){
          alert(this.account.Message);
        } else {
          alert('註冊成功');
          window.location.href = '/home';
        }
        this.account.Message = '';
      } ,
      (err) => {
        console.log(err);
        this.account.Message = err.message;

        alert(this.account.Message);
        this.account.Message = '';
      }
    );
  }

// 測試用方法
  onTest(){
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'text/plain; charset=utf-8'
        // x-www-form-urlencoded
        // Accept: 'application/json'
        // dataType: 'Json'
    }),
    params:
     new HttpParams()
        .set('UserID', '0')
        .set('AccountName', this.account.AccountName)
        .set('Password', this.account.Password)
        .set('PasswordConfirm', this.account.PasswordConfirm)
        .set('UserName', this.account.UserName)
        .set('Email', this.account.Email)
        .set('Phone', this.account.Phone)
        .set('Message', this.account.Message)
  };

    const httpOptions2 = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json'
  }),
};

    const data =  {
  AccountName: 'A',
  Password: 'A',
  PasswordConfirm: 'A',
  UserName: 'A',
  Email: 'A',
  Phone: 'A'
};
    this.httpClient.post('https://localhost:44362/AccountAn/Test', JSON.stringify(this.account) , httpOptions).subscribe(
      (res) => {
        console.log(res);
      } ,
      (err) => {
        console.log(err);
      }
    );
  }

}
