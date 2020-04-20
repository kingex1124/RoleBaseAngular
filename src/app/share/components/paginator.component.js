import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let PaginatorComponent = class PaginatorComponent {
    constructor() {
        this.pageChanged = new EventEmitter();
        this.pages = [];
        this.currPage = 1;
        this.maxPage = 1;
    }
    ngOnInit() {
        this.reset();
    }
    reset() {
        if (this.gridDataPage) {
            this.currPage = this.gridDataPage.page;
            this.maxPage = this.gridDataPage.maxPage;
            this.pages = Array.from({ length: this.gridDataPage.maxPage }, (v, k) => k + 1);
        }
    }
    changePage(page) {
        if (this.currPage !== page) {
            this.currPage = page;
            this.pageChanged.emit(page);
        }
    }
};
tslib_1.__decorate([
    Input()
], PaginatorComponent.prototype, "gridDataPage", void 0);
tslib_1.__decorate([
    Output()
], PaginatorComponent.prototype, "pageChanged", void 0);
PaginatorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-mci-paginator',
        templateUrl: './mci-paginator.component.html',
        styleUrls: ['./mci-paginator.component.scss']
    })
], PaginatorComponent);
export { PaginatorComponent as MciPaginatorComponent };
//# sourceMappingURL=mci-paginator.component.js.map
