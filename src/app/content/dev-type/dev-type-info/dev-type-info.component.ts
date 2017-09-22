import { DevTypeInfo } from './devTypeInfo';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../service/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzModalService } from 'ng-zorro-antd';   // modal组件

@Component({
  selector: 'my-dev-type-info',
  templateUrl: './dev-type-info.component.html',
  styleUrls: ['./dev-type-info.component.css']
})
export class DevTypeInfoComponent implements OnInit {
  devTypeInfo: DevTypeInfo = new DevTypeInfo();  // 储存用户详情信息
  devTypeId: string;    // 接收路由参数
  devRoles;             // 储存原始角色列表
  roleListEditObj = {}; // 定义一个空对象来保存修改中的数据
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
        this.devRoles = this.devTypeInfo.devRoles;
        // 给devRoles每一项都添加一个key来标识是否正在编辑该行
        this.devRoles.map(item => {
          item.editRow = false;
        });
        console.log(this.devRoles);
      });
  }

  edit(idx) {
    console.log('edit start ' + idx);
    console.log(this.devTypeInfo.devRoles[idx]);
    this.devTypeInfo.devRoles[idx].editRow = true;
  }

}
