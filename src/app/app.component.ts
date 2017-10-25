import { HttpService } from './service/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from './service/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private httpService: HttpService,
    private router: Router,
    private storeService: StoreService,
  ) {

  }

  ngOnInit() {
    // console.clear();
    // 第一时间判断登录状态、设置isloggedin值
    this.httpService.getData('admin/checkLogin.do', '')
      .subscribe(res => {
        if (res.data.isLogin === 1) {
          window.localStorage.setItem('assessToken', '1')
        } else if (res.data.isLogin === 0) {
          window.localStorage.setItem('accessToken', '0')
        }
      });
  }
}
