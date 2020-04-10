import { Component, OnInit } from '@angular/core';
import { AccountRegist } from '../models/account-regist.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  SERVER_URL = 'https://localhost:44362/AccountAn/RegistAccount';

  account: AccountRegist = { UserId: 0, AccountName: '', Password: '',
   PasswordConfirm: '', UserName: '' , Email: '', Phone: '', Message: ''};

  constructor(private httpClient: HttpClient, private router: Router,
             ) {
    this.initAccountRegist();
  }
  public defaultHeaders = new HttpHeaders({'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'});

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
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }) ,
      params:
       new HttpParams()
          .set('UserID', this.account.UserId.toString())
          .set('AccountName', this.account.AccountName)
          .set('Password', this.account.Password)
          .set('PasswordConfirm', this.account.PasswordConfirm)
          .set('UserName', this.account.UserName)
          .set('Email', this.account.Email)
          .set('Phone', this.account.Phone)
          .set('Message', this.account.Message),
  };

    console.log(JSON.stringify(this.account));
    this.httpClient.post<any>(this.SERVER_URL,  null , httpOptions).subscribe(
      (res) => {
        console.log(res);
        this.account.Message = res.Message;
        alert('註冊成功');

        window.location.href = '/home';

      } ,
      (err) => {
        console.log(err);
        this.account.Message = err.error.Message;

        alert(this.account.Message);
      }
    );

    this.initAccountRegist();
  }

}
