import { StoreService } from './store.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Injectable()
export class AccesstokenService {
  accessToken = false;
  constructor(private httpService: HttpService, private storeService: StoreService) { }
  // 获取登录状态
  checkLogin() {
    this.httpService.getData('admin/checkLogin.do', '')
      .subscribe(res => {
        if (res.data.isLogin === 1) {
          this.accessToken = true;
          this.storeService.setItem('accessToken', 1);
        } else if (res.data.isLogin === 0) {
          this.storeService.setItem('accessToken', 0);
        }
      });
  }
}
