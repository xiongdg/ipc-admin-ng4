import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'my-add-dev-type',
  templateUrl: './add-dev-type.component.html',
  styleUrls: ['./add-dev-type.component.css']
})
export class AddDevTypeComponent implements OnInit {
  validateForm: FormGroup;
  btnText = '新增';
  active = true;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private confirmServ: NzModalService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      typeName: [null, [Validators.required]],
      typeDesc: [null]
    });
  }

  add() {
    this.active = false;  // 阻止连续点击
    this.btnText = '正在提交';
    this.httpService.getData('devType/addDevType.do', this.validateForm.value)
      .subscribe(res => {
        this.active = true;
        if (res.code === 200) {
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
