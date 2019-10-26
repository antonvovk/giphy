import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  background: string;

  @Input()
  position: string;

  @Input()
  startPage = false;

  @Input()
  textColor = '#ffffff';

  @Input()
  maxWidth = '97%';

  @Input()
  padding: string;

  @Input()
  btnColor: string;

  @Input()
  btnBgColor: string;

  @Input()
  btnBg: string;

  constructor() {
  }

  ngOnInit() {
    console.log(this.btnBg);
    console.log(this.btnBgColor);
  }
}
