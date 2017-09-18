import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-add-dev',
  templateUrl: './add-dev.component.html',
  styleUrls: ['./add-dev.component.css']
})
export class AddDevComponent implements OnInit {
  validateForm: FormGroup;
  nOptions;
  btnText = '新增';
  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit() {
    // 请求p2p服务商列表
    this.httpService.getData('tdp2p/queryP2PProviderList.do', '')
      .subscribe(res => {
        if (res.code === 200) {
          this.nOptions = res.data.p2pProvider;
        }
      });

    this.validateForm = this.fb.group({
      devTypeId: [null, [Validators.required]],
      devStatus: [null, [Validators.required]],
      seriesNumber: [null, [Validators.required]],
      clientSecret: [null, [Validators.required]],
      _regDate: [null, [Validators.required]],
      p2pID: [null],
      p2pSecret: [null]
    });
    // 检测登录状态
    this.httpService.getData('admin/checkLogin.do', '')
      .subscribe(res => {
        console.log(res);
      });
  }

  add() {
    console.log(this.validateForm.value);
    this.validateForm.value.regDate = this.validateForm.value._regDate.getTime();
    console.log(this.validateForm.value);
    this.btnText = '正在提交';
    this.httpService.getData('dev/addDev.do', this.validateForm.value)
      .subscribe(res => {
        if (res.code === 200) {
          console.log(res);
          this.btnText = '提交';
        } else {

        }
      });
  }
}
