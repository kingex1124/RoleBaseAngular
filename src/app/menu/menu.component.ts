import { Component, OnInit } from '@angular/core';
import { SecurityLevel } from '../models/security-level.model';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { DBkeys } from '../services/db-keys';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuFlag = true;
  securityLevel: SecurityLevel;
  accountNane: string;

  SERVER_URL = 'https://localhost:44362/AccountAn/Logout';

  constructor(private localStorage: LocalStoreManager,
              private httpClient: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.securityLevel =  this.localStorage.getData(DBkeys.SECURITYLEVEL) as SecurityLevel;
    if (this.securityLevel){
    this.accountNane = this.securityLevel.UserData.AccountName;
    }
    console.log( this.securityLevel);
  }

  onAccountManage(){
    this.menuFlag = ! this.menuFlag;
  }

  onLogout(){
    this.httpClient.post<any>(this.SERVER_URL, '').subscribe(
      (res) => {
        console.log(res);

        this.securityLevel = res as SecurityLevel;
        this.localStorage.deleteData(DBkeys.SECURITYLEVEL);
        this.accountNane = '';
        console.log(this.localStorage.getData(DBkeys.SECURITYLEVEL));

        this.router.navigateByUrl('/home');
        this.ngOnInit();
      } ,
      (err) => {
        console.log(err);
      }
    );
  }
}
