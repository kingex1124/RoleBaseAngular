import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuFlag = true;
  constructor() { }

  ngOnInit(): void {
  }

  onAccountManage(){
    this.menuFlag = ! this.menuFlag;
  }
}
