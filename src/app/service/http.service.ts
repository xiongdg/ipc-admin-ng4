import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  // baseUrl = 'https://easy-mock.com/mock/59b21369e0dc663341a1f9fd/ipc/';
  baseUrl = 'http://192.168.1.101:81/kinzo-web/';
  constructor(public http: Http) { }

  getData(url: string, data: any): Observable<any> {
    return this.http
      .get(this.baseUrl + url, {search: data})
      .map((res: Response) => {
        return res.json();
      });
  }
}
