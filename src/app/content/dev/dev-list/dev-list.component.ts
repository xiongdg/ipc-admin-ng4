import { QueryDevData } from './queryDevData';
import { StoreService } from './../../../service/store.service';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'my-dev-list',
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.css']
})
export class DevListComponent implements OnInit {
  _bordered = true;     // 表格样式
  _pagination = false;  // 表格样式
  _header = true;       // 表格样式
  _title = false;       // 表格样式
  _footer = false;      // 表格底部
  _size = 'middle';     // 表格样式
  _loading = false;     // 表格更新数据动画

  _dataSet = [];        // 表格数据
  // 设备在线状态
  onlineStatus: boolean;
  // 查询数据
  // queryData = new QueryData();
  queryDevData = {
    query: '',
    devStatus: '',
    startTime: null,
    endTime: null,
    startPage: 1,
    pageSize: 10
  };
  devStatuses = [
    { label: '激活', value: 'active' },
    { label: '未激活', value: 'inactive' },
    { label: '失效', value: 'invalid' }
  ];
  nextCanUse = true;          // 配合my-pagination组件，是否有下一页
  constructor(private httpService: HttpService, private storeService: StoreService) { }

  ngOnInit() {
    // 从localstorage获取每页条数
    this.queryDevData.pageSize = Number(this.storeService.getItem('itemPerPage_devList')) || 10;
    this.getData();
  }

  refreshData(val) {
    this._loading = true;
    this.nextCanUse = true;
    if (val === 'itemChange') { // 如果是修改了每页条数，那么重新设置localstorage存的页码
      this.storeService.setItem('itemPerPage_devList', this.queryDevData.pageSize);
    }
    this.getData();
  }
  // 搜索
  doSearch() {
    this.getData();
  }
  // 查询在线状态
  getState(val, idx) {
    this._dataSet[idx].devOnLive = '查询中..';
    this.httpService.getData('dev/queryOnlineStatus.do', { cid: val })
      .subscribe(res => {
        this._dataSet[idx].devOnLive = res.data.onlineStatus;
        console.log(res.data.onlineStatus);
        if (res.data.onlineStatus === 0) {
          this._dataSet[idx].devOnLive = '离线';
        } else if (res.data.onlineStatus === 1) {
          this._dataSet[idx].devOnLive = '在线';
        } else {
          this._dataSet[idx].devOnLive = '重试';
        }
      });
  }

  getData() {
    this._loading = true;
    console.log(this.queryDevData);
    // 保存一下开始时间和结束时间
    let startTime = this.queryDevData.startTime;
    let endTime = this.queryDevData.endTime;
    if (this.queryDevData.startTime) {
      this.queryDevData.startTime = this.queryDevData.startTime.getTime();
    }
    if (this.queryDevData.endTime) {
      this.queryDevData.endTime = this.queryDevData.endTime.getTime();
    }
    this.httpService.getData('dev/queryDevList.do', this.queryDevData) // 刷新数据
      .subscribe((data) => {
        this._loading = false;
        if (data.data.devList.length < Number(this.queryDevData.pageSize)) {
          this.nextCanUse = false;
        }
        this._dataSet = data.data.devList;
        // 将时间重新赋值给queryDevData.startTime
        this.queryDevData.startTime = startTime;
        this.queryDevData.endTime = endTime;
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
    if (this.queryDevData.startTime > this.queryDevData.endTime) {
      this.queryDevData.endTime = null;
    }
  }
  _endValueChange = () => {
    if (this.queryDevData.startTime > this.queryDevData.endTime) {
      this.queryDevData.startTime = null;
    }
  }
  _disabledStartDate = (startValue) => {
    if (!startValue || !this.queryDevData.endTime) {
      return false;
    }
    return startValue.getTime() >= this.queryDevData.endTime.getTime();
  }
  _disabledEndDate = (endValue) => {
    if (!endValue || !this.queryDevData.startTime) {
      return false;
    }
    return endValue.getTime() <= this.queryDevData.startTime.getTime();
  }
  get _isSameDay() {
    return this.queryDevData.startTime && this.queryDevData.endTime &&
      moment(this.queryDevData.startTime).isSame(this.queryDevData.endTime, 'day');
  }
  get _endTime() {
    return {
      nzHideDisabledOptions: true,
      nzDisabledHours: () => {
        return this._isSameDay ? this.newArray(this.queryDevData.startTime.getHours()) : [];
      },
      nzDisabledMinutes: (h) => {
        if (this._isSameDay && h === this.queryDevData.startTime.getHours()) {
          return this.newArray(this.queryDevData.startTime.getMinutes());
        }
        return [];
      },
      nzDisabledSeconds: (h, m) => {
        if (this._isSameDay && h === this.queryDevData.startTime.getHours() && m === this.queryDevData.startTime.getMinutes()) {
          return this.newArray(this.queryDevData.startTime.getSeconds());
        }
        return [];
      }
    };
  }
}

