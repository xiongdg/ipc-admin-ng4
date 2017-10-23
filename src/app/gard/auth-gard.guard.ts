import { StoreService } from './../service/store.service';
import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivateChild,
  // NavigationEnd, NavigationExtras, CanLoad,
  Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthGardGuard implements CanActivate, CanActivateChild {

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // 再此处判断登录状态。如果未登录将路由导至登录路由。已登录则判断是否在跳往登录，如果是则导至首页
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string) {
    if (url === '/user/login' && this.storeService.getItem('accessToken') === '1') {   // 对于登录页，如果已登录则阻止
      this.router.navigate(['user-list']);    // 重定向至首页
      return false;
    }
    // 在路灯系统中，关闭未登录检测。避免显示登录页。做自动登录
    if (url !== '/user/login' && this.storeService.getItem('accessToken') === '0') {   // 对于非登录页，如果未登录则阻止
      this.router.navigate(['user/login']);    // 重定向至登录页
      return false;
    }
    return true;
  }
}
