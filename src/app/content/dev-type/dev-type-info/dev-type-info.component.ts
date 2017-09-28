import { AddRomVerComponent } from './add-rom-ver/add-rom-ver.component';
import { DevTypeInfo, DevRole, BaseInfoObj } from './devTypeInfo';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../service/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzModalService } from 'ng-zorro-antd';   // modal组件
import { AddRoleComponent } from './add-role/add-role.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-dev-type-info',
  templateUrl: './dev-type-info.component.html',
  styleUrls: ['./dev-type-info.component.css']
})
export class DevTypeInfoComponent implements OnInit {
  devTypeInfo: DevTypeInfo = new DevTypeInfo();  // 储存用户详情信息
  devTypeId: string;    // 接收路由参数
  roleListEditObj = new DevRole(); // 定义一个空对象来保存修改中的数据
  baseInfoEditObj = new BaseInfoObj();         // 定义一个空对象来保存修改中的设备基本信息数据
  baseInfoEdit = false;
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
        this.devTypeId = params.get('devTypeId');
        return this.httpService.getData('devType/queryDevTypeInfo.do', { devTypeId: this.devTypeId });
      })
      .subscribe((data) => {
        this.devTypeInfo = data.data;
        // 给devRoles每一项都添加一个key来标识是否正在编辑该行
        this.devTypeInfo.devRoles.map(item => {
          item.editRow = false;
        });
      });
  }
  /*
   修改基本信息
   */
  editDevBaseInfo() { // 将原值赋给修改值
    this.baseInfoEditObj.devTypeId = this.devTypeId;
    this.baseInfoEditObj.typeName = this.devTypeInfo.typeName;
    this.baseInfoEditObj.typeDesp = this.devTypeInfo.typeDesp;
  }
  okBaseInfo(idx) {   // 提交修改
    this.devTypeId = this.baseInfoEditObj.devTypeId;
    this.devTypeInfo.typeName = this.baseInfoEditObj.typeName;
    this.devTypeInfo.typeDesp = this.baseInfoEditObj.typeDesp;

    this.httpService.getData('devType/updateDevType.do', this.baseInfoEditObj)
      .subscribe(res => {
      });
  }
  // 新增角色
  addRole() {
    const that = this;
    const subscription = this.modalService.open({
      title: '新增角色',
      content: AddRoleComponent,
      onOk() {
        // 提交成功时刷新数据
        that.refresh('devType/queryDevTypeInfo.do');
      },
      onCancel() {
      },
      footer: false,
      componentParams: {
        devTypeId: this.devTypeId,
        addType: 'role'
      }
    });
  }
  // 新增固件版本
  addRomVersion() {
    const that = this;
    const subscription = this.modalService.open({
      title: '新增固件版本',
      content: AddRomVerComponent,
      onOk() {
        // 提交成功时刷新数据
        that.refresh('devType/queryDevTypeInfo.do');
      },
      onCancel() {
      },
      footer: false,
      componentParams: {
        devTypeId: this.devTypeId,
        addType: 'romVersion'
      }
    });
  }

  /*
  * 修改角色能力
   */
  edit(idx) { // 将原值赋给修改值
    this.roleListEditObj = JSON.parse(JSON.stringify(this.devTypeInfo.devRoles[idx]));
  }

  ok(idx) {
    this.devTypeInfo.devRoles[idx] = JSON.parse(JSON.stringify(this.roleListEditObj));
    // 提交修改
    const data = {  // 组装数据
      role: this.devTypeInfo.devRoles[idx].role,
      devTypeId: this.devTypeId,
      jsonCapability: this.devTypeInfo.devRoles[idx].roleAbility
    };
    this.httpService.getData('devType/editDevTypeRoleCapability.do', data)
      .subscribe(res => {
      });
  }

  // 刷新数据
  refresh(url) {
    this.httpService.getData(url, { devTypeId: this.devTypeId })
      .subscribe(res => {
        this.devTypeInfo = res.data;
      });
  }
}
