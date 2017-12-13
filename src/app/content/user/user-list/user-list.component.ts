import { QueryData } from './queryData';
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
  _loading = true;      // 表格更新数据动画

  _total = 1;           // 数据总条数
  _dataSet = [];        // 表格数据
  // 查询数据
  queryData = {
    query: '',
    userNameStatus: '',
    startTime: null,
    endTime: null,
    startPage: 1,
    pageSize: 20
  };
  userNameStatuses = [
    { label: '激活', value: 'active' },
    { label: '未激活', value: 'inactive' },
    { label: '失效', value: 'invalid' }
  ];
  constructor(private httpService: HttpService, private storeService: StoreService) { }

  ngOnInit() {
    // 从localstorage获取每页条数
    this.queryData.pageSize = Number(this.storeService.getItem('itemPerPage_userList')) || 10;
    this.getData(true);
  }
  // 刷新数据
  refreshData(val) {
    this._loading = true;
    this.getData();
    if (val) {  // 将新的每页条数存入storage
      this.storeService.setItem('itemPerPage_userList', this.queryData.pageSize)
    }
  }
  /**
   * 搜索
   * 获取数据同时刷新总条数
   */
  doSearch() {
    this._loading = true;
    this.queryData.startPage = 1;
    this.getData(true);
  }
  /**
   * 获取数据
   * @param needTotalItem 为true时同时刷新总条数
   */
  getData(needTotalItem: boolean = false) {
    // 保存一下开始时间和结束时间
    const startTime = this.queryData.startTime;
    const endTime = this.queryData.endTime;
    if (this.queryData.startTime) {
      this.queryData.startTime = this.queryData.startTime.getTime();
    }
    if (this.queryData.endTime) {
      this.queryData.endTime = this.queryData.endTime.getTime();
    }
    // 浅拷贝请求参数
    const queryData = { ...this.queryData }
    console.log(queryData)
    if (needTotalItem) {  // 是否需要请求总条数
      this.getTotalItem(queryData)
    }
    this.httpService.getData('user/queryUserList.do', queryData) // 刷新数据
      .subscribe((data) => {
        this._loading = false;
        if (!data.data) {
          return;
        }
        this._dataSet = data.data.users;
        console.log(this._dataSet)
        this._loading = false
        // 将时间重新赋值给queryData.startTime
        this.queryData.startTime = startTime;
        this.queryData.endTime = endTime;
      });
  }

  // 获取总条数
  getTotalItem(queryData) {
    this.httpService.getData('user/queryUserListTotalItems.do', queryData) // 同样的参数
      .subscribe(data => {
        this._total = Number(data.data)
      })
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
    };
  }
}
