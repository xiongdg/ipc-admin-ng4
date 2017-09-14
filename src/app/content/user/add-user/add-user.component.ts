import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  data = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 1; i++) {
      this.data.push({
        name   : `Edward King ${i}`,
        age    : 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
  }

}
