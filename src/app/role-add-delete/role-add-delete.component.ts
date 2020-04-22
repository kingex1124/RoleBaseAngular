import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SecurityLevel } from '../models/security-level.model';
import { Operation } from '../models/operation.enum';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { LayoutService } from '../services/layout.service';
import { DBkeys } from '../services/db-keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleVO } from '../models/role-vo.model';
import { PaginatorComponent } from '../share/paginator/paginator.component';
import { GridDataPage } from '../models/grid-data-page.model';
import { PaginatorService } from '../services/paginator.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-role-add-delete',
  templateUrl: './role-add-delete.component.html',
  styleUrls: ['./role-add-delete.component.scss']
})
export class RoleAddDeleteComponent implements OnInit, AfterViewInit {

  // API地址
  SERVER_URL = 'https://localhost:44362/api/RoleAnApi/';

  // 權限相關資料
  securityLevel: SecurityLevel;

  // 是否顯示按鈕判斷屬性
  roleAddRegin = true;
  roleEditBtn = true;
  roleDeleteBtn = true;

  // 轉頁屬性
  operation = Operation;
  currOperatiom: Operation = Operation.roleadddelete;

  // 新增角色用屬性
  addRoleVO: RoleVO = {} as RoleVO;

  // Table角色資料
  roleVO: RoleVO[];
  allRoleVO: RoleVO[];
  expandRowArr: boolean[] = [];
  roleVOGridDataPage: GridDataPage = { page: 1, take: 5, maxPage: 1, datas: [] };

  constructor(private localStorage: LocalStoreManager,
              private layoutService: LayoutService,
              private httpClient: HttpClient,
              private paginatorService: PaginatorService) { }

  // 分頁相關物件
  @ViewChild('roleAddDeletePaginator', { static: false }) roleAddDeletePaginator: PaginatorComponent;

  ngOnInit(): void {
    // 取得權限資料
    this.securityLevel = this.localStorage.getData(DBkeys.SECURITYLEVEL);
    // 設定分頁
    this.layoutService.layoutChanged$.subscribe(o => {
      this.currOperatiom = o;
    });
    // 設定權限
    this.setAuthority();
    // 取得Table資料
    this.getTableData();
  }

  // 權限判斷
  setAuthority() {
    if (this.securityLevel) {
      if (!this.getUrlData('Role/RoleAddEditDelete')) {
        this.layoutService.changeOperation(Operation.nocompetence);
      }

      if (!this.getUrlData('Role/AddRole')) {
        this.roleAddRegin = false;
      }

      if (!this.getUrlData('Role/EditRole')) {
        this.roleEditBtn = false;
      }

      if (!this.getUrlData('Role/DeleteRole')) {
        this.roleDeleteBtn = false;
      }
    }
  }

  // 判斷是否符合權限
  getUrlData(url: string) {
    return this.securityLevel.SecurityUrl.find(o => o.Url === url);
  }

  // 新增角色
  AddRole(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    this.httpClient.post<any>(this.SERVER_URL + 'AddRole', JSON.stringify(this.addRoleVO), httpOptions).subscribe(
      (res) => {
        console.log(res);
        if (res){
          if (res.Message !== undefined && res.Message !== null){
              alert(res.Message);
          }else {
            alert('新增成功');
            setTimeout( () => {
              this.getTableData();
             }, 500 );
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.clearAddRoleData();
  }

  // 清空新增角色的欄位
  clearAddRoleData(){
    this.addRoleVO.RoleName = '';
    this.addRoleVO.Description = '';
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

        if (this.roleAddDeletePaginator) {
          this.roleAddDeletePaginator.reset();
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
    this.roleAddDeletePaginator.reset();
  }

  // 按下編輯按鈕
  EditRole(i) {
    console.log(i);
    this.expandRowArr[i] = !this.expandRowArr[i];
  }

  // 按下儲存按鈕
  SaveRole(item: RoleVO, i) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    this.httpClient.post<any>(this.SERVER_URL + 'EditRole',
     JSON.stringify(item) , httpOptions).subscribe(
      (res) => {
        console.log(res);
        if (res){
              alert(res);
        }else {
            alert('編輯成功');
            setTimeout( () => {
              this.getTableData();
             }, 500 );
          }
      },
      (err) => {
        console.log(err);
      }
    );

    this.expandRowArr[i] = !this.expandRowArr[i];
  }

  // 按下取消按鈕
  CancleRole(i) {
    this.expandRowArr[i] = !this.expandRowArr[i];
    this.getTableData();
  }

  // 按下刪除按鈕
  DeleteRole(i) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    this.httpClient.post<any>(this.SERVER_URL + 'DeleteRole',
     JSON.stringify({RoleID: i} as RoleVO) , httpOptions).subscribe(
      (res) => {
        console.log(res);
        if (res){
              alert(res);
        }else {
            alert('刪除成功');
            setTimeout( () => {
              this.getTableData();
             }, 500 );
          }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
