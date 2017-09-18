import { HttpService } from './../../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }
  login() {
    this.httpService.getData('admin/login.do', { username: this.username, password: this.password })
      .subscribe(res => {
        console.log(res);
      });
  }
}
