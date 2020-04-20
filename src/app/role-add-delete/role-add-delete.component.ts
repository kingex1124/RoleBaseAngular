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

@Component({
  selector: 'app-role-add-delete',
  templateUrl: './role-add-delete.component.html',
  styleUrls: ['./role-add-delete.component.scss']
})
export class RoleAddDeleteComponent implements OnInit , AfterViewInit{
  SERVER_URL = 'https://localhost:44362/api/RoleAnApi/RoleAddEditDelete';

  securityLevel: SecurityLevel;
  roleAddRegin = true;

// 轉頁屬性
operation = Operation;
currOperatiom: Operation = Operation.roleadddelete;

// Table角色資料
roleVO: RoleVO[];
allRoleVO: RoleVO[];
expandRowArr: boolean[] = [];
roleVOGridDataPage: GridDataPage = { page: 1, take: 2, maxPage: 1, datas: [] };

  constructor(private localStorage: LocalStoreManager,
              private layoutService: LayoutService,
              private httpClient: HttpClient,
              private paginatorService: PaginatorService) { }

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

     this.getTableData();
  }

// 權限判斷
setAuthority(){
  if (this.securityLevel){
    if (!this.getUrlData('Role/RoleAddEditDelete')){
      this.layoutService.changeOperation(Operation.nocompetence);
    }

    if (!this.getUrlData('Role/AddRole')){
      this.roleAddRegin = false;
    }

    // if (!this.getUrlData('Role/RoleUserEdit')){
    //  this.editRoleUserBtn = false;
    // }
  }
 }

  getUrlData(url: string){
    return this.securityLevel.SecurityUrl.find(o => o.Url === url);
  }

  getTableData(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    })
  };

    this.httpClient.post<any>(this.SERVER_URL,  null , httpOptions).subscribe(
      (res) => {
        console.log(res);

        this.allRoleVO = res;

        console.log(this.roleVO);

        this.setRoleVOForPage(1);

        if (this.roleAddDeletePaginator) {
          this.roleAddDeletePaginator.reset();
        }
      } ,
      (err) => {
        console.log(err);
      }
    );
  }

  setRoleVOForPage(page: number){
    this.paginatorService.getGridDataPage(this.allRoleVO, this.roleVOGridDataPage, page);
    this.roleVO = this.roleVOGridDataPage.datas as RoleVO[];
    this.roleVO.forEach(() => {
      this.expandRowArr.push(false);
    });
  }

  onPageChanged(page: number) {
    this.setRoleVOForPage(page);
  }

  ngAfterViewInit(): void {
    this.roleAddDeletePaginator.reset();
  }

  EditRole(i){
console.log(i);
this.expandRowArr[i] = !this.expandRowArr[i];
  }

  SaveRole(i){
    console.log(this.allRoleVO[i]);
    this.expandRowArr[i] = !this.expandRowArr[i];
  }

  CancleRole(i){
    this.expandRowArr[i] = !this.expandRowArr[i];
    this.getTableData();
  }

  DeleteRole(i){
    console.log(this.allRoleVO[i]);
    this.getTableData();
  }
}
