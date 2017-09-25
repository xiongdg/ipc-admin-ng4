import { AddRomVerComponent } from './add-rom-ver/add-rom-ver.component';
import { DevTypeInfo, DevRole } from './devTypeInfo';
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
  roleEditIdx = false;
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
        console.log('父组件cancel');
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
        console.log('父组件cancel');
      },
      footer: false,
      componentParams: {
        devTypeId: this.devTypeId,
        addType: 'romVersion'
      }
    });
    // subscription.subscribe(result => {
    //   console.log('result: ' + result);
    // });
  }
  edit(idx) { // 将原值赋给修改值
    console.log('edit');
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
