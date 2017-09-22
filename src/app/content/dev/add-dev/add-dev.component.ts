import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'my-add-dev',
  templateUrl: './add-dev.component.html',
  styleUrls: ['./add-dev.component.css']
})
export class AddDevComponent implements OnInit {
  validateForm: FormGroup;
  p2pProOptions;
  devStatusOptions = [
    { label: '激活', value: 'unallocated' },
    { label: '未激活', value: 'inactive' },
    { label: '未分配', value: 'unallocated' },
    { label: '失效', value: 'invalid' }
  ];
  devTypeListOptions;
  btnText = '新增';
  active = true;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private confirmServ: NzModalService
  ) { }

  ngOnInit() {
    // 请求p2p服务商列表
    this.httpService.getData('tdp2p/queryP2PProviderList.do', '')
      .subscribe(res => {
        if (res.code === 200) {
          this.p2pProOptions = res.data.p2pProvider;
          console.log(this.p2pProOptions);
        }
      });
    // 请求设备类型列表
    this.httpService.getData('devType/queryDevTypeList.do', '')
      .subscribe(res => {
        if (res.code === 200) {
          this.devTypeListOptions = res.data.devTypeList;
        }
      });

    this.validateForm = this.fb.group({
      devTypeId: [null, [Validators.required]],
      devStatus: [null, [Validators.required]],
      seriesNumber: [null, [Validators.required]],
      clientSecret: [null, [Validators.required]],
      _regDate: [null, [Validators.required]],
      initStreamPk: [null, [Validators.required]],
      p2pID: [null, [Validators.required]],
      p2pSecret: [null, [Validators.required]]
    });
  }

  add() {
    this.active = false;  // 阻止连续点击
    console.log(this.validateForm.value);
    this.validateForm.value.regDate = this.validateForm.value._regDate.getTime();
    console.log(this.validateForm.value);
    this.btnText = '正在提交';
    this.httpService.getData('dev/addDev.do', this.validateForm.value)
      .subscribe(res => {
        this.active = true;
        if (res.code === 200) {
          console.log(res);
          this.btnText = '提交';
          // 提交成功
          const modal = this.confirmServ.success({
            // title: '',
            content: '新建完成'
          });
          setTimeout(() => modal.destroy(), 1000);
        } else {
          // 提交失败
          const modal = this.confirmServ.warning({
            // title: '',
            content: '新增失败'
          });
          setTimeout(() => modal.destroy(), 1000);
        }
      });
  }
}
