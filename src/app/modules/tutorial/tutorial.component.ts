import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  fractal = false;
  color = false;
  affine = false;

  constructor() {

  }

  ngOnInit() {
  }

  fractalClick() {
    this.fractal = !this.fractal;
  }

  colorClick() {
    this.color = !this.color;
  }

  affineClick() {
    this.affine = !this.affine;
  }
}
