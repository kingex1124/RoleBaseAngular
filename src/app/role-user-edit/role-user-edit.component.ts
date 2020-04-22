import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Operation } from '../models/operation.enum';
import { SecurityLevel } from '../models/security-level.model';
import { DBkeys } from '../services/db-keys';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { LayoutService } from '../services/layout.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleVO } from '../models/role-vo.model';
import { GridDataPage } from '../models/grid-data-page.model';
import { PaginatorService } from '../services/paginator.service';
import { PaginatorComponent } from '../share/paginator/paginator.component';
import { UserCheckVO } from '../models/user-check-vo.model';

@Component({
  selector: 'app-role-user-edit',
  templateUrl: './role-user-edit.component.html',
  styleUrls: ['./role-user-edit.component.scss']
})
export class RoleUserEditComponent implements OnInit , AfterViewInit{

  // API地址
  SERVER_URL = 'https://localhost:44362/api/RoleAnApi/';

  // 權限相關資料
  securityLevel: SecurityLevel;

  // 是否顯示按鈕判斷屬性
  roleEditBtn = true;
  roleUserEditBtn = true;

  // 轉頁屬性
  operation = Operation;
  currOperatiom: Operation = Operation.roleuseredit;

   // Table角色資料
   roleVO: RoleVO[];
   allRoleVO: RoleVO[];
   expandRowArr: boolean[] = [];
   roleVOGridDataPage: GridDataPage = { page: 1, take: 5, maxPage: 1, datas: [] };

   // 所編輯的角色ID
   showRoleID = '';

   // 是否顯示角色Table
   showRoleTable = false;

   // Table角色使用者資料
   userCheckVO: UserCheckVO[];
   allUserCheckVO: UserCheckVO[];
   userCheckVOGridDataPage: GridDataPage = { page: 1, take: 5, maxPage: 1, datas: [] };

  constructor(private localStorage: LocalStoreManager,
              private layoutService: LayoutService,
              private httpClient: HttpClient,
              private paginatorService: PaginatorService) { }

  // 分頁相關物件
  @ViewChild('roleUserEditPaginator', { static: false }) roleUserEditPaginator: PaginatorComponent;
  @ViewChild('userCheckPaginator', { static: false }) userCheckPaginator: PaginatorComponent;

  ngOnInit(): void {
     // 取得權限資料
     this.securityLevel = this.localStorage.getData(DBkeys.SECURITYLEVEL);
     // 設定分頁
     this.layoutService.layoutChanged$.subscribe(o => {
       this.currOperatiom = o;
     });
    // 設定權限
     this.setAuthority();
     // 取得角色Table資料
     this.getTableData();
  }

 // 權限判斷
 setAuthority() {
  if (this.securityLevel) {
    if (!this.getUrlData('Role/RoleUserEdit')) {
      this.layoutService.changeOperation(Operation.nocompetence);
    }

    if (!this.getUrlData('Role/GetUserByRole')) {
      this.roleEditBtn = false;
    }

    if (!this.getUrlData('Role/SaveRoleUserSetting')) {
      this.roleUserEditBtn = false;
    }
  }
}

  // 判斷是否符合權限
  getUrlData(url: string) {
    return this.securityLevel.SecurityUrl.find(o => o.Url === url);
  }

// 取得角色Table資料
getTableData() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  this.httpClient.post<any>(this.SERVER_URL + 'RoleAddEditDelete', null, httpOptions).subscribe(
    (res) => {
      console.log(res);

      this.allRoleVO = res;

      this.setRoleVOForPage(1);

      if (this.roleUserEditPaginator) {
        this.roleUserEditPaginator.reset();
      }
    },
    (err) => {
      console.log(err);
    }
  );
}

// 設置Table分頁
setRoleVOForPage(page: number) {
  this.paginatorService.getGridDataPage(this.allRoleVO, this.roleVOGridDataPage, page);
  this.roleVO = this.roleVOGridDataPage.datas as RoleVO[];
  this.roleVO.forEach(() => {
    this.expandRowArr.push(false);
  });
}

// 切換分頁觸發事件
onPageChanged(page: number) {
  this.setRoleVOForPage(page);
}

ngAfterViewInit(): void {
  this.roleUserEditPaginator.reset();
}
EditRole(roleID){
this.showRoleID = roleID;
this.showRoleTable = true;
this.getRoleUserTable(roleID);
}

getRoleUserTable(roleID){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  this.httpClient.post<any>(this.SERVER_URL + 'GetUserByRole', JSON.stringify({RoleID: roleID} as RoleVO), httpOptions).subscribe(
    (res) => {
      console.log(res);

      this.allUserCheckVO = res;

      this.setUserCheckVOForPage(1);

      if (this.userCheckPaginator) {
        this.userCheckPaginator.reset();
      }
    },
    (err) => {
      console.log(err);
    }
  );
}

// 設置Table分頁
setUserCheckVOForPage(page: number) {
  this.paginatorService.getGridDataPage(this.allUserCheckVO, this.userCheckVOGridDataPage, page);
  this.userCheckVO = this.userCheckVOGridDataPage.datas as UserCheckVO[];
}

// 切換分頁觸發事件
onUserCheckPageChanged(page: number) {
  this.setUserCheckVOForPage(page);
}

  SaveSetting() {
    let checkData: UserCheckVO[] = [] as UserCheckVO[];

    this.allUserCheckVO.forEach(o => {
      if (o.Check === true) {
        o.RoleID = this.showRoleID;
        checkData.push(o);
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    if (checkData.length !== 0) {
      this.httpClient.post<any>(this.SERVER_URL + 'SaveRoleUserSetting', JSON.stringify(checkData), httpOptions).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            alert(res);
          } else {
            alert('編輯成功');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.httpClient.post<any>(this.SERVER_URL + 'NoSelectSaveRoleUserSetting',
        JSON.stringify({ RoleID: this.showRoleID } as RoleVO), httpOptions).subscribe(
          (res) => {
            console.log(res);
            if (res) {
              alert(res);
            } else {
              alert('編輯成功');
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
    this.showRoleTable = !this.showRoleTable;
    this.showRoleID = '';
  }

}
