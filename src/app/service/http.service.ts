import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  // baseUrl = 'https://easy-mock.com/mock/59b21369e0dc663341a1f9fd/ipc/';
  baseUrl = 'http://192.168.1.101:81/kinzo-admin/';
  constructor(public http: Http) { }

  getData(url: string, data: any): Observable<any> {
    return this.http
      .get(this.baseUrl + url, {
        withCredentials: true,  // 跨域传递cookie必须设置
        params: data
      })
      .map((res: Response) => {
        if (res.json().code === 500) {  // 如果有错误
          if (res.json().errorCode === 2002) { // 检查错误码
            console.log(res.json().errorMessage);
          }
        }
        return res.json();
      });
  }
}
