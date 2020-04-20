import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridDataPage } from 'src/app/models/grid-data-page.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() gridDataPage: GridDataPage;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  pages: number[] = [];
  currPage = 1;
  maxPage = 1;
  constructor() { }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    if (this.gridDataPage) {
      this.currPage = this.gridDataPage.page;
      this.maxPage = this.gridDataPage.maxPage;
      this.pages = Array.from({ length: this.gridDataPage.maxPage }, (v, k) => k + 1);
    }
  }

  changePage(page: number) {
    if (this.currPage !== page) {
      this.currPage = page;
      this.pageChanged.emit(page);
    }
  }
}
