import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isOpenOne = true;
  isOpenTwo = false;
  isOpenThree = false;
  isOpenFour = false;
  isOpenFive = false;
  isOpenSix = false;

  openChange(value) {
    if (value === 'one') {
      this.isOpenTwo = false;
      this.isOpenThree = false;
      this.isOpenFour = false;
      this.isOpenFive = false;
      this.isOpenSix = false;
    } else if (value === 'two') {
      this.isOpenOne = false;
      this.isOpenThree = false;
      this.isOpenFour = false;
      this.isOpenFive = false;
      this.isOpenSix = false;
    } else if (value === 'three') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
      this.isOpenFour = false;
      this.isOpenFive = false;
      this.isOpenSix = false;
    } else if (value === 'four') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
      this.isOpenThree = false;
      this.isOpenFive = false;
      this.isOpenSix = false;
    } else if (value === 'five') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
      this.isOpenFour = false;
      this.isOpenThree = false;
      this.isOpenSix = false;
    } else if (value === 'six') {
      this.isOpenOne = false;
      this.isOpenTwo = false;
      this.isOpenFour = false;
      this.isOpenThree = false;
      this.isOpenFive = false;
    }

  }
  constructor() { }

  ngOnInit() {
  }

}
