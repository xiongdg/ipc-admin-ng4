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
        return this.httpService.getData('devType/queryDevTypeInfo.do', { cid: this.devTypeId });
      })
      .subscribe((data) => {
        this.devTypeInfo = data.data;
        console.log(data);
      });
  }

  edit(idx) {
    console.log('edit start ' + idx);
  }

}
