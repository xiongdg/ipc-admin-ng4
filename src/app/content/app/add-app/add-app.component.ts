import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';   // 使用model需要

@Component({
  selector: 'my-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.css']
})
export class AddAppComponent implements OnInit {
  validateForm: FormGroup;
  statusOptions = [
    { label: '激活', value: 'active' },
    { label: '未激活', value: 'inactive' },
    { label: '失效', value: 'invalid' }
  ];
  btnText = '新增';
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private confirmServ: NzModalService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      // appId: [null, [Validators.required]],    // 新增app不需要传appId
      appName: [null, [Validators.required]],
      appDesc: [null, [Validators.required]],
      appStatus: [null, [Validators.required]],
      getuiAppid: [null, [Validators.required]],
      getuiAppkey: [null, [Validators.required]],
      getuiStatus: [null, [Validators.required]]
    });
  }

  add() {
    this.isLoading = true;
    this.btnText = '正在提交';
    this.httpService.getData('appType/updateAppType.do', this.validateForm.value)
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
            content: res.code
          });
          setTimeout(() => modal.destroy(), 1000);
        }
      });
  }
}
