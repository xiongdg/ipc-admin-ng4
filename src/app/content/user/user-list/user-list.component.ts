import { StoreService } from './../../../service/store.service';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'my-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  _bordered = true;     // 表格样式
  _pagination = false;  // 表格样式
  _header = true;       // 表格样式
  _title = false;       // 表格样式
  _footer = false;      // 表格底部
  _size = 'middle';     // 表格样式

  _dataSet = [];        // 表格数据
  _loading = false;     // 表格更新数据动画
  options = [           // 设置每页条数select数据
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '30', value: '30' },
    { label: '40', value: '40' },
    { label: '50', value: '50' }
  ];

  _current = 1;         // 当前页码
  _itemPerPage = 10;    // 每页条数
  nextCanUse = true;    // 配合my-pagination组件，是否有下一页
  constructor(private httpService: HttpService, private storeService: StoreService) { }

  ngOnInit() {
    // 从localstorage获取每页条数
    this._itemPerPage = Number(this.storeService.getItem('_itemPerPage'));
    console.log(this._itemPerPage);
    this.httpService.getData('/userList', {})
      .subscribe((data) => {
        if (data.users.length === 0) {
          this.nextCanUse = false;
        }
        this._dataSet = data.users;
      });
  }

  pageChange(val) {
    this._loading = true;
    // 获取到新页码
    console.log('val' + val);
    this._refreshData();
  }
  _refreshData() {
    this.httpService.getData('/userList', {})
      .subscribe((data) => {
        this._loading = false;
        console.log(data.users.length);
        if (data.users.length < this._itemPerPage) {  // 如果这一页的条数小于每页条数(包括0)
          // 告诉子组件禁用下一页按钮
          console.log(11111);
          this.nextCanUse = false;
        } else {
          this.nextCanUse = true;
        }
        this._dataSet = data.users;
      });
  }
  // 设置每页条数，重新刷新数据并设置localstorage
  changeItemPerPage() {
    this._current = 1;  // 默认第一页
    this._loading = true; // 开启加载数据动画
    // 将新设置的每页条数存入localstorage
    console.log('itemPerPage ' + this._itemPerPage);
    this.storeService.setItem('_itemPerPage', this._itemPerPage);
    // 刷新数据
    this._refreshData();
  }
}
