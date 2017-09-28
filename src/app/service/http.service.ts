import { StoreService } from './store.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {
  baseUrl = 'https://easy-mock.com/mock/59b21369e0dc663341a1f9fd/ipc/';
  // baseUrl = 'http://192.168.1.101:81/kinzo-admin/';
  // baseUrl = 'http://192.168.2.92:8080/kinzo-admin/';
  // baseUrl = '/kinzo-admin/';
  constructor(public http: Http, private router: Router, private storeService: StoreService) { }

  getData(url: string, data: any): Observable<any> {
    const that = this;
    return this.http
      .get(this.baseUrl + url, {
        // withCredentials: true,  // 跨域传递cookie必须设置
        params: data,
        // headers: new Headers({
        //   'x-kz-dm': 'mc',
        //   'Access-Control-Allow-Headers': 'x-kz-dm,Access-Control-Allow-Headers'
        // })
      })
      .map((res: Response) => {
        if (res.json().code === 500) {  // 如果有错误
          if (res.json().errorCode === 2002) { // 未登录
            // 将登录标识设置为false、路由跳转至登录页
            this.storeService.setItem('accessToken', 0);
            this.router.navigate(['user/login']);
          }
        }
        return res.json();
      });
  }
}
