import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  preCanUse = false;  // 初始化时上一页按钮不可用
  @Input()
  nextCanUse: boolean;  // 传入是否下页按钮可用
  @Input()
  currentPage;  // 当前页数
  @Output()
  _pageChange = new EventEmitter<number>();  // 定义一个事件，这个事件可以触发父组件的某个事件，并向父组件传递一个number
  constructor() { }

  ngOnInit() {

  }
  pageChange(val) {

    this.currentPage = this.currentPage + val;
    if (this.currentPage > 1) {
      this.preCanUse = true;
    } else {
      this.preCanUse = false;
    }
    this._pageChange.emit(this.currentPage);
  }

}
