import { HttpService } from './../../service/http.service';
import { StoreService } from './../../service/store.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  // tslint: disable-next-line: component-selector;
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public btnText = '登录';
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    // 表单数据
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  // 提交表单
  _submitForm() {
    this.btnText = '正在登录...';
    this.httpService.getData('admin/login.do', this.validateForm.value)
      .subscribe(data => {
        if (data.code === 200) {
          // 将登录标识设置为'1'、路由跳转至内容页
          this.storeService.setItem('accessToken', '1');
          this.router.navigate(['user-list']);
        } else {
          this.btnText = '登录';
          alert(data.errorMessage);
        }
      });
  }
}
