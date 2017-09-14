import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'my-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userInfo: object;
  accountId: string;
  status: string;  // 激活状态
  editStatus: string;  // 修改过程中的status，以作撤销状态修改
  currentModal;
  isConfirmLoading = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    // this.editStatus = this.userInfo.userNameStatus;  // 将status赋值给editStatus
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.accountId = params.get('id');
        return this.httpService.getData('appPath/user/queryUserInfo.do', { id: params.get('id') });
      })
      .subscribe((data) => {
        this.userInfo = data.data;
        this.status = data.data.userNameStatus; // 将状态保存
      });
  }
  // 修改激活状态
  showModalForTemplate(titleTpl, contentTpl, footerTpl) {
    this.editStatus = this.status;          // 将状态赋值给修改状态
    const that = this;  // 存一下this，在onOk回调中使用
    this.currentModal = this.modalService.open({
      title: titleTpl,
      content: contentTpl,
      footer: footerTpl,
      maskClosable: false,
      onOk() {  // 成功关闭model的回调函数
        that.status = that.editStatus;  // 将修改状态赋值给状态
      },
      onCancel() {  // 返回model的回调函数
        console.log('click cancel');
      }
    });
  }
  handleOk(e) {
    this.isConfirmLoading = true;
    this.httpService.getData('/appPath/user/updateStatus.do', { accountId: '111', userNameStatus: this.editStatus })
      .subscribe(res => { // 修改成功，获取操作date
        console.log(res);
        this.currentModal.destroy('onOk');  // 触发回调
        this.isConfirmLoading = false;      // 关闭动画
        this.currentModal = null;           // 清除modal
      });
  }
}
