import { HttpService } from './../../../../service/http.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalSubject, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


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


  jsonValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) { // 如果值为空
      return { required: true };
    } else if (!this.isJSON(control.value)) {  // 如果格式错误
      return { error: true, isJson: true };
    }
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
      jsonCapability: [null, [this.jsonValidator]],
    });
  }

  add() {
    this.active = false;  // 阻止连续点击
    // 组装数据，加入devTypeId
    this.validateForm.value.devTypeId = this._devTypeId;
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

  isJSON(str) {
    if (typeof str === 'string') {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}
