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
  btnText = '新增';
  isLoading = false;
  validateForm: FormGroup;
  p2pProOptions;
  devStatusOptions = [
    { label: '激活', value: 'active' },
    { label: '未激活', value: 'inactive' },
    { label: '未分配', value: 'unallocated' },
    { label: '失效', value: 'invalid' }
  ];
  devTypeListOptions;
  // active = true;
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
      cid: [null],
      devTypeId: [null, [Validators.required]],
      devStatus: [null, [Validators.required]],
      seriesNumber: [null, [Validators.required]],
      clientSecret: [null, [Validators.required]],
      _regDate: [null],
      initStreamPk: [null, [Validators.required]],
      p2pID: [null],
      p2pSecret: [null]
    });
  }

  add() {
    
    // 检测p2pID(seriesNumber)和p2pSecret(clientSecret)如果为空，则将其值设置为seriesNumber、clientSecret
    if(!this.validateForm.value.p2pID){
      this.validateForm.value.p2pID = this.validateForm.value.seriesNumber
    }
    if(!this.validateForm.value.p2pSecret){
      this.validateForm.value.p2pSecret = this.validateForm.value.clientSecret
    }
    console.log(this.validateForm.value._regDate)
    if(this.validateForm.value._regDate){ // 日期不为空时，将时间格式转换为时间戳
      this.validateForm.value.regDate = this.validateForm.value._regDate.getTime();
    }else{
      this.validateForm.value.regDate = null
    }
    this.btnText = '正在提交';
    this.httpService.getData('dev/addDev.do', this.validateForm.value)
      .subscribe(res => {
        // this.active = true;
        if (res.code === 200) {
          // 提交成功
          this.btnText = '新增';
          this.isLoading = false;
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
