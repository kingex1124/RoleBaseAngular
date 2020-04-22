import { Component, OnInit } from '@angular/core';
import { Operation } from '../models/operation.enum';
import { SecurityLevel } from '../models/security-level.model';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { LayoutService } from '../services/layout.service';
import { DBkeys } from '../services/db-keys';

@Component({
  selector: 'app-function-management',
  templateUrl: './function-management.component.html',
  styleUrls: ['./function-management.component.scss']
})
export class FunctionManagementComponent implements OnInit {

  // 權限相關資料
  securityLevel: SecurityLevel;

  // 轉頁屬性
  operation = Operation;
  currOperatiom: Operation = Operation.functionmanagement;

  // 是否顯示按鈕判斷屬性
  editFunctionBtn = true;
  editFunctionRoleBtn = true;

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
      if (!this.getUrlData('Function/FunctionManagement')) {
        this.layoutService.changeOperation(Operation.nocompetence);
      }

      if (!this.getUrlData('Function/FunctionAddEditDelete')) {
        this.editFunctionBtn = false;
      }

      if (!this.getUrlData('Function/RoleFunctionEdit')) {
        this.editFunctionRoleBtn = false;
      }
    }
  }

  // 判斷是否符合權限
  getUrlData(url: string) {
    return this.securityLevel.SecurityUrl.find(o => o.Url === url);
  }

  onToRoleAddDelete() {
    this.layoutService.changeOperation(Operation.functionadddelete);
  }

}
