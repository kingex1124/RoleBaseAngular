import { Injectable } from '@angular/core';
import { GridDataPage } from '../models/grid-data-page.model';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }

  getGridDataPage(allDatas: any[], gridDataPage: GridDataPage, page: number) {
    gridDataPage.page = page;
    let start = (page - 1) * gridDataPage.take;
    if (start > allDatas.length) {
      start = allDatas.length;
    }
    let end = start + gridDataPage.take;
    if (end > allDatas.length) {
      end = allDatas.length;
    }
    gridDataPage.maxPage = Math.ceil(allDatas.length / gridDataPage.take);
    gridDataPage.datas = allDatas.slice(start, end);
  }
}
