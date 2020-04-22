import { Component, OnInit } from '@angular/core';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { SecurityLevel } from '../models/security-level.model';
import { LayoutService } from '../services/layout.service';
import { Operation } from '../models/operation.enum';
import { DBkeys } from '../services/db-keys';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  // 權限相關資料
  securityLevel: SecurityLevel;

  // 轉頁屬性
  operation = Operation;
  currOperatiom: Operation = Operation.rolemanagement;

  // 是否顯示按鈕判斷屬性
  editRoleBtn = true;
  editRoleUserBtn = true;

  constructor(private localStorage: LocalStoreManager,
              private layoutService: LayoutService) { }

  ngOnInit(): void {
    // 取得權限資料
    this.securityLevel = this.localStorage.getData(DBkeys.SECURITYLEVEL);
    // 設定分頁
    this.layoutService.layoutChanged$.subscribe(o => {
      this.currOperatiom = o;
    });
    // 設定權限
    this.setAuthority();
  }

  // 權限判斷
  setAuthority() {
    if (this.securityLevel) {
      if (!this.getUrlData('Role/RoleManagement')) {
        this.layoutService.changeOperation(Operation.nocompetence);
      }

      if (!this.getUrlData('Role/RoleAddEditDelete')) {
        this.editRoleBtn = false;
      }

      if (!this.getUrlData('Role/RoleUserEdit')) {
        this.editRoleUserBtn = false;
      }
    }
  }

  // 判斷是否符合權限
  getUrlData(url: string) {
    return this.securityLevel.SecurityUrl.find(o => o.Url === url);
  }

  // 前往角色新增刪除頁面
  onToRoleAddDelete() {
    this.layoutService.changeOperation(Operation.roleadddelete);
  }

  // 回到角色管理頁面
  returnRoleManagement(){
    this.layoutService.changeOperation(Operation.rolemanagement);
  }
  // // 測試轉頁
  // onTest() {
  //   this.layoutService.changeOperation(Operation.regist);
  // }

}
