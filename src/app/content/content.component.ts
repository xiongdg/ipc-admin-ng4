import { StoreService } from './../service/store.service';
import { HttpService } from './../service/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isOpenOne = true;
  isOpenTwo = false;
  isOpenThree = false;
  isOpenFour = false;
  isOpenFive = false;
  isOpenSix = false;
  isCollapsed = false;

  openChange(value) {
    if (value === 'one') {
      this.isOpenTwo = false;
      this.isOpenThree = false;
      this.isOpenFour = false;
      this.isOpenFive = false;
      this.isOpenSix = false;
    } else if (value === 'two') {
      this.isOpenOne = false;
      this.isOpenThree = false;
      this.isOpenFour = false;
      this.isOpenFive = false;
      this.isOpenSix = false;
    } else if (value === 'three') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
      this.isOpenFour = false;
      this.isOpenFive = false;
      this.isOpenSix = false;
    } else if (value === 'four') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
      this.isOpenThree = false;
      this.isOpenFive = false;
      this.isOpenSix = false;
    } else if (value === 'five') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
      this.isOpenFour = false;
      this.isOpenThree = false;
      this.isOpenSix = false;
    } else if (value === 'six') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
      this.isOpenFour = false;
      this.isOpenThree = false;
      this.isOpenFive = false;
    }

  }
  constructor(
    private httpService: HttpService,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  // 退出登录
  logOut() {
    this.httpService.getData('admin/logout.do', '')
      .subscribe(res => {
        // 将登录标识设置为false、跳转至登录页
        this.storeService.setItem('accessToken', 0);
        this.router.navigate(['user/login']);
      });
  }
}
