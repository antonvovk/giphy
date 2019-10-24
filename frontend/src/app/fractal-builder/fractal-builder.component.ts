import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HFractal} from '../fractals/h-fractal';
import {LevyCCurve} from '../fractals/levy-c-curve';
import {MinkowskiCurve} from '../fractals/minkowski-curve';
import {KochLine} from '../fractals/koch-line';
import {DragonCurve} from '../fractals/dragon-curve';
import {ColorEvent} from 'ngx-color';

export interface Fractal {
  value: string;
  viewValue: string;
}

export interface FractalGroup {
  disabled?: boolean;
  name: string;
  fractal: Fractal[];
}

@Component({
  selector: 'app-fractal-builder',
  templateUrl: './fractal-builder.component.html',
  styleUrls: ['./fractal-builder.component.scss']
})
export class FractalBuilderComponent implements OnInit {
  fractalControl = new FormControl();
  fractalGroups: FractalGroup[] = [
    {
      name: 'Geometric',
      fractal: [
        {value: 'h-fractal', viewValue: 'H-Fractal'},
        {value: 'minkowski-sausage', viewValue: 'Minkowski Sausage'},
        {value: 'levy-c-curve', viewValue: 'Lévy C curve'}
      ]
    },
    {
      name: 'IFS',
      fractal: [
        {value: 'koch-snowflake', viewValue: 'Koch snowflake'},
        {value: 'dragon-curve', viewValue: 'Dragon curve'}
      ]
    }
  ];

  fractalForm = new FormGroup({
    iterations: new FormControl(1),
    lineThickness: new FormControl(1)
  });

  lineColor = '#000000';
  backgroundColor = '#ffffff';
  lineColors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];

  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('mainContent', {static: false}) mainContent: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  drawFractal() {
    this.canvas.nativeElement.width = this.mainContent.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.mainContent.nativeElement.offsetHeight;

    if (this.fractalControl.value === 'h-fractal') {
      const drawer = new HFractal(this.canvas.nativeElement, this.lineColor,
        this.fractalForm.get('lineThickness').value, this.backgroundColor);
      drawer.draw(this.fractalForm.get('iterations').value);
    }
    if (this.fractalControl.value === 'levy-c-curve') {
      const drawer = new LevyCCurve(this.canvas.nativeElement, this.lineColor,
        this.fractalForm.get('lineThickness').value, this.backgroundColor);
      drawer.draw(this.fractalForm.get('iterations').value);
    }
    if (this.fractalControl.value === 'minkowski-sausage') {
      const drawer = new MinkowskiCurve(this.canvas.nativeElement, this.lineColor,
        this.fractalForm.get('lineThickness').value, this.backgroundColor);
      drawer.draw(this.fractalForm.get('iterations').value);
    }
    if (this.fractalControl.value === 'koch-snowflake') {
      const drawer = new KochLine(this.canvas.nativeElement, this.lineColor,
        this.fractalForm.get('lineThickness').value, this.backgroundColor);
      drawer.draw(this.fractalForm.get('iterations').value);
    }
    if (this.fractalControl.value === 'dragon-curve') {
      const drawer = new DragonCurve(this.canvas.nativeElement, this.lineColor,
        this.fractalForm.get('lineThickness').value, this.backgroundColor);
      drawer.draw(this.fractalForm.get('iterations').value);
    }
  }

  onLineColorChange($event: ColorEvent) {
    this.lineColor = $event.color.hex;
  }

  onBackgroundColorChange($event: ColorEvent) {
    this.backgroundColor = $event.color.hex;
  }

  fractalSelectValueChanged() {
    console.log(this.fractalControl.value);
  }
}
