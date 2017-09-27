import { AccesstokenService } from './service/accesstoken.service';
import { HttpService } from './service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private httpService: HttpService,
    private accesstokenService: AccesstokenService
  ) {

  }

  ngOnInit() {
    // console.clear();
    // 第一时间判断登录状态、设置isloggedin值
    this.httpService.getData('admin/checkLogin.do', '')
      .subscribe(res => {
        if (res.data.isLogin === 1) {
          this.accesstokenService.accessToken = true;
        } else if (res.data.isLogin === 0) {
          this.accesstokenService.accessToken = false;
        }
      });
  }
}
