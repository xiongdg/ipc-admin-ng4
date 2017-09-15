import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private httpService: HttpService) { }

  ngOnInit() {

  }

  add() {
    this.httpService.getData('user/addUser.do', this.addInfo)
      .subscribe(res => {
        if (res.code === 200) {
          console.log(res);
        } else {

        }
      });
  }

}
