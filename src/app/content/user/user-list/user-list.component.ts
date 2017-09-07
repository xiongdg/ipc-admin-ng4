import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  _dataSet = [];
  _bordered = true;
  _loading = false;
  _header = true;
  _title = true;
  _footer = true;
  _size = 'middle';
  _current = 1;
  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this._dataSet.push({
        key: i,
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
      });
    }
  }

}
