import { Component, OnInit } from '@angular/core';
import { Operation } from '../models/operation.enum';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    // 轉頁屬性
    operation = Operation;
    currOperatiom: Operation = Operation.home;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.layoutChanged$.subscribe(o => {
      this.currOperatiom = o;
    });
  }

}
