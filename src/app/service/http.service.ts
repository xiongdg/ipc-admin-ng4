import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  baseUrl = 'https://easy-mock.com/mock/59b21369e0dc663341a1f9fd/ipc/';
  constructor(public http: Http) { }

  getData(url: string, data: any): Observable<any> {
    return this.http
      .get(this.baseUrl + url, { search: data })
      .map((res: Response) => {
        return res.json();
      });
  }
}
