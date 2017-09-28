import { AddVersionComponent } from './add-version/add-version.component';
import { Component, OnInit } from '@angular/core';
// import { DevInfo } from './DevInfo';
import { HttpService } from './../../../service/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzModalService } from 'ng-zorro-antd';   // modal组件
import { AppBaseInfo } from './AppInfo';

@Component({
  selector: 'my-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {
  appId;
  appInfo;
  editAppBaseInfo = new AppBaseInfo();  // 空对象用于保存修改中的baseInfo
  statusOptions = [
    {label: '激活', value: 'active'},
    {label: '未激活', value: 'inactive'},
    {label: '失效', value: 'invalid'}
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    // 根据cid获取详情
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.appId = params.get('appId');
        return this.httpService.getData('appType/queryAppTypeInfo.do', { appId: params.get('appId') });
      })
      .subscribe((data) => {
        this.appInfo = data.data;
      });
  }
  /*
     修改基本信息
     */
  editDevBaseInfo() { // 将原值赋给修改值
    this.editAppBaseInfo.appId = this.appId;
    this.editAppBaseInfo.appName = this.appInfo.app.appName;
    this.editAppBaseInfo.appDesp = this.appInfo.app.appDesp;
    this.editAppBaseInfo.appStatus = this.appInfo.app.appStatus;
    this.editAppBaseInfo.getuiAppid = this.appInfo.getui.getuiAppid;
    this.editAppBaseInfo.getuiAppkey = this.appInfo.getui.getuiAppkey;
    this.editAppBaseInfo.getuiStatus = this.appInfo.getui.getuiStatus;
  }
  okBaseInfo(idx) {   // 提交修改TODO
    this.appInfo.app.appName = this.editAppBaseInfo.appName;
    this.appInfo.app.appDesp = this.editAppBaseInfo.appDesp;
    this.appInfo.app.appStatus = this.editAppBaseInfo.appStatus;
    this.appInfo.getui.getuiAppid = this.editAppBaseInfo.getuiAppid;
    this.appInfo.getui.getuiAppkey = this.editAppBaseInfo.getuiAppkey;
    this.appInfo.getui.getuiStatus = this.editAppBaseInfo.getuiStatus;

    this.httpService.getData('devType/updateDevType.do', this.editAppBaseInfo)
      .subscribe(res => {
      });
  }
  // 新增版本
  addRole() {
    const that = this;
    const subscription = this.modalService.open({
      title: '新增版本',
      content: AddVersionComponent,
      onOk() {
        // 提交成功时刷新数据
        that.refresh('appType/queryAppTypeInfo.do');
      },
      onCancel() {
      },
      footer: false,
      componentParams: {
        appId: this.appId,
      }
    });
  }

  // 刷新数据
  refresh(url) {
    this.httpService.getData(url, { appId: this.appId })
      .subscribe(res => {
        this.appInfo = res.data;
      });
  }
}
