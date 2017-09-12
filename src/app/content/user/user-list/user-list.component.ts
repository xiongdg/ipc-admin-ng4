import { StoreService } from './../../../service/store.service';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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
  _loading = false;     // 表格更新数据动画

  _dataSet = [];        // 表格数据
  // 查询数据
  queryData = {
    query: '',
    userNameStatus: '',
    startTime: null,
    endTime: null,
    startPage: null,
    itemPerPage_userList: null
  };
  userNameStatuses = [
    { label: '激活', value: 'active' },
    { label: '未激活', value: 'inactive' },
    { label: '失效', value: 'invalid' }
  ];
  nextCanUse = true;          // 配合my-pagination组件，是否有下一页
  constructor(private httpService: HttpService, private storeService: StoreService) { }

  ngOnInit() {
    // 从localstorage获取每页条数
    this.queryData.itemPerPage_userList = this.storeService.getItem('itemPerPage_userList') || 10;
    this.getData();
  }

  refreshData(val) {
    this._loading = true;
    this.nextCanUse = true;
    if (val === 'itemChange') { // 如果是修改了每页条数，那么重新设置localstorage存的页码
      this.storeService.setItem('itemPerPage_userList', this.queryData.itemPerPage_userList);
    }
    this.getData();
  }

  doSearch() {
    console.log(this.queryData);
    this.getData();
  }
  getData() {
    console.log(this.queryData);
    this.httpService.getData('/appPath/user/queryUserList.do', this.queryData) // 刷新数据
      .subscribe((data) => {
        console.log(data);
        this._loading = false;
        if (data.data.users.length < Number(this.queryData.itemPerPage_userList)) {
          this.nextCanUse = false;
        }
        this._dataSet = data.data.users;
      });
  }

  // 下面为datePicker设置
  newArray = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  }
  _startValueChange = () => {
    if (this.queryData.startTime > this.queryData.endTime) {
      this.queryData.endTime = null;
    }
  }
  _endValueChange = () => {
    if (this.queryData.startTime > this.queryData.endTime) {
      this.queryData.startTime = null;
    }
  }
  _disabledStartDate = (startValue) => {
    if (!startValue || !this.queryData.endTime) {
      return false;
    }
    return startValue.getTime() >= this.queryData.endTime.getTime();
  }
  _disabledEndDate = (endValue) => {
    if (!endValue || !this.queryData.startTime) {
      return false;
    }
    return endValue.getTime() <= this.queryData.startTime.getTime();
  }
  get _isSameDay() {
    return this.queryData.startTime && this.queryData.endTime && moment(this.queryData.startTime).isSame(this.queryData.endTime, 'day');
  }
  get _endTime() {
    return {
      nzHideDisabledOptions: true,
      nzDisabledHours: () => {
        return this._isSameDay ? this.newArray(this.queryData.startTime.getHours()) : [];
      },
      nzDisabledMinutes: (h) => {
        if (this._isSameDay && h === this.queryData.startTime.getHours()) {
          return this.newArray(this.queryData.startTime.getMinutes());
        }
        return [];
      },
      nzDisabledSeconds: (h, m) => {
        if (this._isSameDay && h === this.queryData.startTime.getHours() && m === this.queryData.startTime.getMinutes()) {
          return this.newArray(this.queryData.startTime.getSeconds());
        }
        return [];
      }
    }
  }
}
