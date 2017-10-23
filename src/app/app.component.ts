import { AccesstokenService } from './service/accesstoken.service';
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
    private accesstokenService: AccesstokenService,
    private router: Router,
    private storeService: StoreService,
  ) {

  }

  ngOnInit() {
    // 自动登录
    // this.httpService.getData('admin/login.do', {userName: 'admin', password: 'admin'})
    // .subscribe(data => {
    //   console.log(1);
    //   if (data.code === 200) {
    //     // 将登录标识设置为true、路由跳转至内容页
    //     this.storeService.setItem('accessToken', 1);
    //     this.router.navigate(['user-list']);
    //   }
    // });
    // console.clear();
    // 第一时间判断登录状态、设置isloggedin值
    this.httpService.getData('admin/checkLogin.do', '')
      .subscribe(res => {
        console.log(2);
        if (res.data.isLogin === 1) {
          this.accesstokenService.accessToken = true;
        } else if (res.data.isLogin === 0) {
          this.accesstokenService.accessToken = false;
        }
      });
  }
}
