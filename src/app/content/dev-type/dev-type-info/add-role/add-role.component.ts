import { HttpService } from './../../../../service/http.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalSubject, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'my-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  validateForm: FormGroup;
  btnText = '新增';
  active = true;
  _devTypeId: string;
  @Input()
  set devTypeId(value: string) {
    this._devTypeId = value;
  }
  handleCancel(e) {
    this.subject.destroy('onCancel'); // 触发父组件onCancel
  }

  constructor(
    private fb: FormBuilder,
    private subject: NzModalSubject,
    private httpService: HttpService,
    private confirmServ: NzModalService
  ) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      role: [null, [Validators.required]],
      jsonCapability: [null, [Validators.required]],
    });
  }

  add() {
    console.log('add');
    this.active = false;  // 阻止连续点击
    // 组装数据，加入devTypeId
    this.validateForm.value.devTypeId = this._devTypeId;
    console.log(this.validateForm.value);
    this.btnText = '正在提交';
    this.httpService.getData('devType/editDevTypeRoleCapability.do', this.validateForm.value)
      .subscribe(res => {
        this.active = true;
        if (res.code === 200) {
          // 关闭对话框
          // this.subject.next('传出数据');
          this.subject.destroy('onOk'); // 触发父组件onOk,注意需要传入onOk字串
          const modal = this.confirmServ.success({
            // title: '',
            content: '新建完成'
          });
          setTimeout(() => modal.destroy(), 1000);
        } else {
          // this.subject.next(res.errorMessage);
          this.subject.destroy(); // 触发父组件onOk
          // 提交失败
          const modal = this.confirmServ.warning({
            content: res.errorMessage
          });
          setTimeout(() => modal.destroy(), 1000);
        }
      });
  }
}
