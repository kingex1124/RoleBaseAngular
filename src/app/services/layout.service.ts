import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Operation } from '../models/operation.enum';


@Injectable()
export class LayoutService {
    private onLayoutChanged = new Subject<Operation>();
    layoutChanged$ = this.onLayoutChanged.asObservable();

    constructor() { }

    changeOperation(operation: Operation) {
        this.onLayoutChanged.next(operation);
        window.scroll({ left: 0, top: 0 });
    }
}
