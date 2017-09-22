import { QueryDevTypeData } from './queryDevTypeData';
import { StoreService } from './../../../service/store.service';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'my-dev-type-list',
  templateUrl: './dev-type-list.component.html',
  styleUrls: ['./dev-type-list.component.css']
})
export class DevTypeListComponent implements OnInit {
  _bordered = true;     // 表格样式
  _pagination = false;  // 表格样式
  _header = true;       // 表格样式
  _title = false;       // 表格样式
  _footer = false;      // 表格底部
  _size = 'middle';     // 表格样式
  _loading = false;     // 表格更新数据动画

  _dataSet = [];        // 表格数据

  queryDevTypeData = {
    query: '',
    startTime: null,
    endTime: null,
    startPage: 1,
    pageSize: 10
  };
  nextCanUse = true;          // 配合my-pagination组件，是否有下一页
  constructor(private httpService: HttpService, private storeService: StoreService) { }

  ngOnInit() {
    // 从localstorage获取每页条数
    this.queryDevTypeData.pageSize = Number(this.storeService.getItem('itemPerPage_devTypeList')) || 10;
    this.getData();
  }

  refreshData(val) {
    this._loading = true;
    this.nextCanUse = true;
    if (val === 'itemChange') { // 如果是修改了每页条数，那么重新设置localstorage存的页码
      this.storeService.setItem('itemPerPage_devTypeList', this.queryDevTypeData.pageSize);
    }
    this.getData();
  }

  // 搜索
  doSearch() {
    this._loading = true;
    this.queryDevTypeData.startPage = 1;
    this.nextCanUse = true;
    this.getData();
  }

  getData() {
    this._loading = true;
    console.log(this.queryDevTypeData);
    // 保存一下开始时间和结束时间
    let startTime = this.queryDevTypeData.startTime;
    let endTime = this.queryDevTypeData.endTime;
    if (this.queryDevTypeData.startTime) {
      this.queryDevTypeData.startTime = this.queryDevTypeData.startTime.getTime();
    }
    if (this.queryDevTypeData.endTime) {
      this.queryDevTypeData.endTime = this.queryDevTypeData.endTime.getTime();
    }
    this.httpService.getData('devType/queryDevTypeList2.do', this.queryDevTypeData) // 刷新数据
      .subscribe((data) => {
        this._loading = false;
        if (data.data.devTypeList === null) {
          data.data.devTypeList = [];
        }
        if (data.data.devTypeList.length < Number(this.queryDevTypeData.pageSize)) {
          this.nextCanUse = false;
        } else {
          this.nextCanUse = true;
        }
        this._dataSet = data.data.devTypeList;
        // 将时间重新赋值给queryDevTypeData.startTime
        this.queryDevTypeData.startTime = startTime;
        this.queryDevTypeData.endTime = endTime;
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
    if (this.queryDevTypeData.startTime > this.queryDevTypeData.endTime) {
      this.queryDevTypeData.endTime = null;
    }
  }
  _endValueChange = () => {
    if (this.queryDevTypeData.startTime > this.queryDevTypeData.endTime) {
      this.queryDevTypeData.startTime = null;
    }
  }
  _disabledStartDate = (startValue) => {
    if (!startValue || !this.queryDevTypeData.endTime) {
      return false;
    }
    return startValue.getTime() >= this.queryDevTypeData.endTime.getTime();
  }
  _disabledEndDate = (endValue) => {
    if (!endValue || !this.queryDevTypeData.startTime) {
      return false;
    }
    return endValue.getTime() <= this.queryDevTypeData.startTime.getTime();
  }
  get _isSameDay() {
    return this.queryDevTypeData.startTime && this.queryDevTypeData.endTime &&
      moment(this.queryDevTypeData.startTime).isSame(this.queryDevTypeData.endTime, 'day');
  }
  get _endTime() {
    return {
      nzHideDisabledOptions: true,
      nzDisabledHours: () => {
        return this._isSameDay ? this.newArray(this.queryDevTypeData.startTime.getHours()) : [];
      },
      nzDisabledMinutes: (h) => {
        if (this._isSameDay && h === this.queryDevTypeData.startTime.getHours()) {
          return this.newArray(this.queryDevTypeData.startTime.getMinutes());
        }
        return [];
      },
      nzDisabledSeconds: (h, m) => {
        if (this._isSameDay && h === this.queryDevTypeData.startTime.getHours() && m === this.queryDevTypeData.startTime.getMinutes()) {
          return this.newArray(this.queryDevTypeData.startTime.getSeconds());
        }
        return [];
      }
    };
  }
}
