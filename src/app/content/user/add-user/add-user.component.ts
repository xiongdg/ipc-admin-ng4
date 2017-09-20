import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
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
  Options = [
    { value: 'active', label: '激活' },
    { value: 'inactive', label: '未激活' },
    { value: 'invalid', label: '失效' }
  ];
  constructor(private httpService: HttpService, private confirmServ: NzModalService) { }

  ngOnInit() {

  }

  add() {
    this.httpService.getData('user/addUser.do', this.addInfo)
      .subscribe(res => {
        if (res.code === 200) {
          console.log(res);
          // 提交成功
          const modal = this.confirmServ.success({
            // title: '',
            content: '新建完成'
          });
          setTimeout(() => modal.destroy(), 1000);
        } else {

        }
      });
  }

}
