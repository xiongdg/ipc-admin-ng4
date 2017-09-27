import { AccesstokenService } from './../service/accesstoken.service';
import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  // NavigationEnd, NavigationExtras, CanLoad,
  Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthGardGuard implements CanActivate {

  constructor(
    private accesstokenService: AccesstokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // 再此处判断登录状态。如果未登录将路由导至登录路由。已登录则判断是否在调往登录，如果是则导至首页
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string) {
    console.log('garud');
    if (url === '/user/login' && this.accesstokenService.accessToken) {   // 对于登录页，如果已登录则阻止
      this.router.navigate(['user-list']);    // 重定向至首页
      return false;
    }
    if (url !== '/user/login' && !this.accesstokenService.accessToken) {   // 对于非登录页，如果未登录则阻止
      this.router.navigate(['user/login']);    // 重定向至登录页
      return false;
    }
    return true;
  }
}
