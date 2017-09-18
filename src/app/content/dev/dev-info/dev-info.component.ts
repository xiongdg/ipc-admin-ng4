import { Component, OnInit } from '@angular/core';
import { DevInfo } from './DevInfo';
import { HttpService } from './../../../service/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzModalService } from 'ng-zorro-antd';   // modal组件

@Component({
  selector: 'my-dev-info',
  templateUrl: './dev-info.component.html',
  styleUrls: ['./dev-info.component.css']
})
export class DevInfoComponent implements OnInit {
  devInfo: DevInfo = new DevInfo();  // 储存用户详情信息
  cid: string;    // 接收路由参数
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.cid = params.get('cid');
        return this.httpService.getData('dev/queryDevInfo.do', { id: params.get('cid') });
      })
      .subscribe((data) => {
        this.devInfo = data.data;
      });
  }

}
