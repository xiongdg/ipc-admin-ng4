import { Component, OnInit } from '@angular/core';
import { DevInfo } from './DevInfo';
import { HttpService } from './../../../service/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzModalService } from 'ng-zorro-antd';   // modal组件

@Component({
  selector: 'my-dev-info',
  templateUrl: './dev-info.component.html',
  styleUrls: ['./dev-info.component.css']
})
export class DevInfoComponent implements OnInit {
  devInfo: DevInfo = new DevInfo();  // 储存用户详情信息
  devOnLiveStatus = '点击查询';                    // 设备在线状态
  cid: string;    // 接收路由参数
  btnText = '强制升级';
  updating = false;
  editRow = false;
  editReMarks;
  editStatus: string;   // 修改过程中的status，以作撤销状态修改
  currentModal;
  isConfirmLoading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    // 根据cid获取详情
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.cid = params.get('cid');
        return this.httpService.getData('dev/queryDevInfo.do', { cid: params.get('cid') });
      })
      .subscribe((data) => {
        this.devInfo = data.data;
      });
    // 根据cid获取设备在线状态
    this.getDevOnlineStatus(this.cid);
  }

  // 强制升级至最新版本
  update(cid) {
    this.updating = true;
    this.httpService.getData('dev/updateDevFirm.do', { cid: cid })
      .subscribe(res => {
        this.updating = false;
        if (res.code === 200) {

        }
      });
  }
  //
  edit() {
    this.editReMarks = this.devInfo.reMarks;
  }
  // 提交
  ok() {
    this.devInfo.reMarks = this.editReMarks;
  }

  // 返回
  cancel() {
  }
  // 查询设备在线状态方法
  getDevOnlineStatus(cid) {
    this.httpService.getData('dev/queryOnlineStatus.do', { cid: cid })
      .subscribe((data) => {
        this.devOnLiveStatus = data.data.onlineStatus;
        if (data.data.onlineStatus === 0) {
          this.devOnLiveStatus = '离线';
        } else if (data.data.onlineStatus === 1) {
          this.devOnLiveStatus = '在线';
        } else {
          this.devOnLiveStatus = '重试';
        }
      });
  }

  // 修改激活状态
  showModalForTemplate(titleTpl, contentTpl, footerTpl) {
    this.editStatus = this.devInfo.devStatus;          // 将状态赋值给修改状态
    const that = this;  // 存一下this，在onOk回调中使用
    this.currentModal = this.modalService.open({
      title: titleTpl,
      content: contentTpl,
      footer: footerTpl,
      maskClosable: false,
      onOk() {  // 成功关闭model的回调函数
        that.devInfo.devStatus = that.editStatus;  // 将修改状态赋值给状态
      },
      onCancel() {  // 返回model的回调函数
        that.editStatus = that.devInfo.devStatus;
      }
    });
  }
  handleOk(e) {
    this.isConfirmLoading = true;
    this.httpService.getData('dev/editDevStatus.do', { cid: this.cid, devStatus: this.editStatus })
      .subscribe(res => { // 修改成功，获取操作date
        if (res.code === 200) {
          this.currentModal.destroy('onOk');  // 触发回调
          this.isConfirmLoading = false;      // 关闭动画
          this.currentModal = null;           // 清除modal
        } else {
          alert(res.errorMessage);
          this.currentModal.destroy('onCancel');  // 关闭
          this.isConfirmLoading = false;
          this.currentModal = null;
        }
      });
  }
}
