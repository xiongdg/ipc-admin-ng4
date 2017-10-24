import { StoreService } from './store.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Injectable()
export class AccesstokenService {
  accessToken = true;
  constructor(private httpService: HttpService, private storeService: StoreService) { }
  // 获取登录状态
  checkLogin() {
    console.log('checkLogin')
    this.httpService.getData('admin/checkLogin.do', '')
      .subscribe(res => {
        console.log(2)
        if (res.data.isLogin === 1) {
          this.accessToken = true;
          this.storeService.setItem('accessToken', 1);
        } else if (res.data.isLogin === 0) {
          // 鉴于异步可能在登录接口完成前执行。所以再请求一次
          this.httpService.getData('admin/checkLogin.do', '')
            .subscribe(res => {
              console.log(4)
              if (res.data.isLogin === 1) {
                this.accessToken = true;
                this.storeService.setItem('accessToken', 1);
              } else if (res.data.isLogin === 0) {
                this.accessToken = false;
                this.storeService.setItem('accessToken', 0);
              }
            })
        }
      });
  }
}
