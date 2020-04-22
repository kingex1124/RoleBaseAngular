import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SecurityLevel } from '../models/security-level.model';
import { Operation } from '../models/operation.enum';
import { FunctionVO } from '../models/function-vo.model';
import { GridDataPage } from '../models/grid-data-page.model';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { LayoutService } from '../services/layout.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaginatorService } from '../services/paginator.service';
import { PaginatorComponent } from '../share/paginator/paginator.component';
import { DBkeys } from '../services/db-keys';

@Component({
  selector: 'app-function-add-delete',
  templateUrl: './function-add-delete.component.html',
  styleUrls: ['./function-add-delete.component.scss']
})
export class FunctionAddDeleteComponent implements OnInit, AfterViewInit {

  // API地址
  SERVER_URL = 'https://localhost:44362/api/FunctionAnApi/';

  // 權限相關資料
  securityLevel: SecurityLevel;

  // 是否顯示按鈕判斷屬性
  functionAddRegin = true;
  functionEditBtn = true;
  functionDeleteBtn = true;

  // 轉頁屬性
  operation = Operation;
  currOperatiom: Operation = Operation.functionadddelete;

  // 新增功能用屬性
  addFunctionVO: FunctionVO = {} as FunctionVO;

  // Table功能資料
  functionVO: FunctionVO[];
  allFunctionVO: FunctionVO[];
  expandRowArr: boolean[] = [];
  functionVOGridDataPage: GridDataPage = { page: 1, take: 5, maxPage: 1, datas: [] };

  constructor(private localStorage: LocalStoreManager,
              private layoutService: LayoutService,
              private httpClient: HttpClient,
              private paginatorService: PaginatorService) { }

  // 分頁相關物件
  @ViewChild('functionAddDeletePaginator', { static: false }) functionAddDeletePaginator: PaginatorComponent;

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
      if (!this.getUrlData('Function/FunctionAddEditDelete')) {
        this.layoutService.changeOperation(Operation.nocompetence);
      }

      if (!this.getUrlData('Function/AddFunction')) {
        this.functionAddRegin = false;
      }

      if (!this.getUrlData('Function/EditFunction')) {
        this.functionEditBtn = false;
      }

      if (!this.getUrlData('Function/DeleteFunction')) {
        this.functionDeleteBtn = false;
      }
    }
  }

  // 判斷是否符合權限
  getUrlData(url: string) {
    return this.securityLevel.SecurityUrl.find(o => o.Url === url);
  }

  // 新增功能
  AddFunction() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    this.httpClient.post<any>(this.SERVER_URL + 'AddFunction', JSON.stringify(this.addFunctionVO), httpOptions).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          if (res.Message !== undefined && res.Message !== null) {
            alert(res.Message);
          } else {
            alert('新增成功');
            setTimeout(() => {
              this.getTableData();
            }, 500);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.clearAddFunctionData();
  }

  // 清空新增功能的欄位
  clearAddFunctionData() {
    this.addFunctionVO.Url = '';
    this.addFunctionVO.Description = '';
  }

  // 取得角色Table資料
  getTableData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    this.httpClient.post<any>(this.SERVER_URL + 'FunctionAddEditDelete', null, httpOptions).subscribe(
      (res) => {
        console.log(res);

        this.allFunctionVO = res;

        this.setRoleVOForPage(1);

        if (this.functionAddDeletePaginator) {
          this.functionAddDeletePaginator.reset();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // 設置Table分頁
  setRoleVOForPage(page: number) {
    this.paginatorService.getGridDataPage(this.allFunctionVO, this.functionVOGridDataPage, page);
    this.functionVO = this.functionVOGridDataPage.datas as FunctionVO[];
    this.functionVO.forEach(() => {
      this.expandRowArr.push(false);
    });
  }

  // 切換分頁觸發事件
  onPageChanged(page: number) {
    this.setRoleVOForPage(page);
  }

  ngAfterViewInit(): void {
    this.functionAddDeletePaginator.reset();
  }

  // 按下編輯按鈕
  EditFunction(i) {
    console.log(i);
    this.expandRowArr[i] = !this.expandRowArr[i];
  }

  // 按下儲存按鈕
  SaveFunction(item: FunctionVO, i) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    this.httpClient.post<any>(this.SERVER_URL + 'EditFunction',
      JSON.stringify(item), httpOptions).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            alert(res);
          } else {
            alert('編輯成功');
            setTimeout(() => {
              this.getTableData();
            }, 500);
          }
        },
        (err) => {
          console.log(err);
        }
      );

    this.expandRowArr[i] = !this.expandRowArr[i];
  }

  // 按下取消按鈕
  CancleFunction(i) {
    this.expandRowArr[i] = !this.expandRowArr[i];
    this.getTableData();
  }

  // 按下刪除按鈕
  DeleteFunction(i) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    this.httpClient.post<any>(this.SERVER_URL + 'DeleteFunction',
      JSON.stringify({ FunctionID: i } as FunctionVO), httpOptions).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            alert(res);
          } else {
            alert('刪除成功');
            setTimeout(() => {
              this.getTableData();
            }, 500);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
