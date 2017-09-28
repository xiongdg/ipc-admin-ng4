import { StoreService } from './../../../service/store.service';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'my-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  _bordered = true;     // 表格样式
  _pagination = false;  // 表格样式
  _header = true;       // 表格样式
  _title = false;       // 表格样式
  _footer = false;      // 表格底部
  _size = 'middle';     // 表格样式
  _loading = false;     // 表格更新数据动画

  _dataSet = [];        // 表格数据

  nextCanUse = true;          // 配合my-pagination组件，是否有下一页
  constructor(private httpService: HttpService, private storeService: StoreService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._loading = true;
    this.httpService.getData('appType/queryAppTypeList.do', '')
      .subscribe(res => {
        this._loading = false;
        this._dataSet = res.data.apps;
      });
  }

}
