import { StoreService } from './../service/store.service';
import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivateChild,
  // NavigationEnd, NavigationExtras, CanLoad,
  Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../service/http.service'

let token = false;

@Injectable()
export class AuthGardGuard implements CanActivate, CanActivateChild {
  constructor(
    private storeService: StoreService,
    private router: Router,
    private http: HttpService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // 再此处判断登录状态。如果未登录将路由导至登录路由。已登录则判断是否在跳往登录，如果是则导至首页
    const url: string = state.url;
    return new Observable((observer) => {
      this.checkLogin(url, observer)
    })
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  getLogin(url: string, observer) {
    this.http.getData('admin/checkLogin.do', '')
      .subscribe((res) => {
        console.log(url)
        if (res.data.isLogin === 1 && url === '/user/login') {   // 已登录阻止前往登录页
          console.log('a')
          this.router.navigate(['user-list']);    // 重定向至首页
          observer.next(false);                   // 阻止跳转
        } else if (res.data.isLogin === 0 && url !== '/user/login') {                 // 未登录阻止前往内容页
          console.log('b');
          this.router.navigate(['user/login']);   // 重定向至登录页
          observer.next(false);
        } else {
          console.log('c')
          observer.next(true)
        }
        observer.complete();
      })
  }

  checkLogin(url: string, observer) {
    if (token) { // 已登录
      this.getLogin(url, observer)  // 已登录则直接获取登录状态并返回true/false
    } else {                                                  // 未登录则先登录再检测登录状态
      this.login(url, observer)     // 未登录则先登录，然后获取登录状态并返回true/false
    }
  }

  login(url, observer) {
    this.http.getData('admin/login.do', { 'username': 'admin', password: 'admin' })
      .subscribe(data => {
        if (data.code === 200) {
          // 将登录标识设置为'1'。token设置为true
          token = true;
          this.storeService.setItem('accessToken', '1');
          this.getLogin(url, observer)  // 登录成功之后检测登录状态
          // this.router.navigate(['user-list']);
        } else {
          alert(data.errorMessage);
        }
      });
  }

}
