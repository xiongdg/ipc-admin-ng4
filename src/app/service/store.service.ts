/*
  储存localstorage
*/
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  constructor() { }
  // 获取item值
  getItem(name) {
    return localStorage.getItem(name) || 10;
  }

  // 设置item值
  setItem(name, value) {
    localStorage.setItem(name, value);
  }
}
