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
    startPage = true;

  constructor() {
  }

  ngOnInit() {
  }
}
