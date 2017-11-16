import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'my-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addInfo = {
    email: '',
    mobile: '',
    userName: '',
    password: '',
    userNameStatus: ''
  };
  validateForm: FormGroup;
  btnText = '新增';
  isLoading = false;
  Options = [
    { value: 'active', label: '激活' },
    { value: 'inactive', label: '未激活' },
    { value: 'invalid', label: '失效' }
  ];
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private confirmServ: NzModalService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      // appId: [null, [Validators.required]],    // 新增app不需要传appId
      email: [null, [Validators.email]],
      mobile: [null],
      userName: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      userNameStatus: [null],
    });
}
add() {
  this.isLoading = true;
  this.btnText = '正在提交';
  this.httpService.getData('user/addUser.do', this.validateForm.value)
    .subscribe(res => {
      if (res.code === 200) {
        // 提交成功
        this.isLoading = false;
        this.btnText = '新增';
        const modal = this.confirmServ.success({
          content: '新建完成'
        });
        setTimeout(() => modal.destroy(), 1000);
      } else {
        // 提交失败
        this.isLoading = false;
        this.btnText = '新增';
        const modal = this.confirmServ.warning({
          content: res.errorMessage
        });
        // setTimeout(() => modal.destroy(), 1000);
      }
    });
}
}
