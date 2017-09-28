/*
  储存localstorage
*/
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  constructor() { }
  // 获取item值
  getItem(name) {
    if (name !== 'accessToken') {
      return localStorage.getItem(name) || 10;
    }
    if (name === 'accessToken') {
      return localStorage.getItem(name) || '0';
    }
  }

  // 设置item值
  setItem(name, value) {
    localStorage.setItem(name, value);
  }
}
