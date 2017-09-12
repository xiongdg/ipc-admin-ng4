import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  preCanUse = false;  // 初始化时上一页按钮不可用
  options = [           // 设置每页条数select数据
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '30', value: '30' },
    { label: '40', value: '40' },
    { label: '50', value: '50' }
  ];
  // 每页数目
  @Input()
  _itemPerPage: any;
  // 将每页数目向外传递
  @Output()
  _itemPerPageChange = new EventEmitter<number | string>();
  // 下一页按钮是否可用
  @Input()
  nextCanUse: boolean = false;  // 传入是否下页按钮可用
  // 当前页数
  @Input()
  _currentPage;  // 当前页数
  // 将当前页数向外传递
  @Output()
  _currentPageChange = new EventEmitter<number | string>();
  @Output()
  refreshData = new EventEmitter(); // 告知上级刷新数据
  constructor() { }

  ngOnInit() {
    this._currentPage = 1;
  }
  pageChange(val) {
    this._currentPage = this._currentPage + val;
    if (this._currentPage === 1) {
      this.preCanUse = false;
    } else {
      this.preCanUse = true;
    }
    this._currentPageChange.emit(this._currentPage);
    this.refreshData.emit('pageChange');
  }

  itemChange() {
    this._currentPage = 1;  // 修改每页显示条数时将页码初始化为1.
    this._currentPageChange.emit(this._currentPage);  // 将页码传出去
    this.preCanUse = false; // 禁用上一页按钮
    // this.nextCanUse = true; // 启用下一页
    this._itemPerPageChange.emit(this._itemPerPage);  // 把每页条数传上去
    this.refreshData.emit('itemChange');
  }

}
