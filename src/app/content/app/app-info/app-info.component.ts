import { Component, OnInit } from '@angular/core';
// import { DevInfo } from './DevInfo';
import { HttpService } from './../../../service/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzModalService } from 'ng-zorro-antd';   // modal组件

@Component({
  selector: 'my-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {
  appId;
  appInfo;
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
        console.log(this.appId);
        return this.httpService.getData('appType/queryAppTypeInfo.do', { appId: params.get('appId') });
      })
      .subscribe((data) => {
        this.appInfo = data.data;
        console.log(data);
      });
  }

}
