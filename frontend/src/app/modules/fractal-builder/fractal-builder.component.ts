import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HFractal} from '../../services/fractals/h-fractal';
import {LevyCCurve} from '../../services/fractals/levy-c-curve';
import {MinkowskiCurve} from '../../services/fractals/minkowski-curve';
import {KochLine} from '../../services/fractals/koch-line';
import {DragonCurve} from '../../services/fractals/dragon-curve';
import {ColorEvent} from 'ngx-color';
import {FractalDrawer} from '../../services/fractals/fractal-drawer';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BottomSheetComponent} from "./popups/bottom-sheet";

@Component({
  selector: 'app-fractal-builder',
  templateUrl: './fractal-builder.component.html',
  styleUrls: ['./fractal-builder.component.scss']
})
export class FractalBuilderComponent {

  formGroup: FormGroup;

  fractalGroups = [
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

  lineColor = '#000000';
  backgroundColor = '#ffffff';
  lineColors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];

  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('mainContent', {static: false}) mainContent: ElementRef;

  constructor(fb: FormBuilder, private bottomSheet: MatBottomSheet) {
    this.formGroup = fb.group({
      iterations: [1, [Validators.min(1), Validators.max(15)]],
      lineThickness: [1, [Validators.min(1), Validators.max(10)]],
      fractalControl: ['none']
    });
  }

  drawFractal() {
    if (this.formGroup.get('iterations').invalid || this.formGroup.get('lineThickness').invalid) {
      return;
    }

    this.canvas.nativeElement.width = this.mainContent.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.mainContent.nativeElement.offsetHeight;
    let drawer: FractalDrawer = null;

    switch (this.formGroup.get('fractalControl').value) {
      case 'h-fractal':
        drawer = new HFractal(this.canvas.nativeElement, this.lineColor,
          this.formGroup.get('lineThickness').value, this.backgroundColor);
        break;
      case 'levy-c-curve':
        drawer = new LevyCCurve(this.canvas.nativeElement, this.lineColor,
          this.formGroup.get('lineThickness').value, this.backgroundColor);
        break;
      case 'minkowski-sausage':
        drawer = new MinkowskiCurve(this.canvas.nativeElement, this.lineColor,
          this.formGroup.get('lineThickness').value, this.backgroundColor);
        break;
      case 'koch-snowflake':
        drawer = new KochLine(this.canvas.nativeElement, this.lineColor,
          this.formGroup.get('lineThickness').value, this.backgroundColor);
        break;
      case 'dragon-curve':
        drawer = new DragonCurve(this.canvas.nativeElement, this.lineColor,
          this.formGroup.get('lineThickness').value, this.backgroundColor);
        break;
      default:
        return;
    }

    drawer.draw(this.formGroup.get('iterations').value);
  }

  onFractalTypeValueChanged() {
    this.drawFractal();
  }

  onIterationsNumberValueChanged() {
    this.drawFractal();
  }

  onLineThicknessValueChanged() {
    this.drawFractal();
  }

  onLineColorValueChanged($event: ColorEvent) {
    this.lineColor = $event.color.hex;
    this.drawFractal();
  }

  onBackgroundColorValueChanged($event: ColorEvent) {
    this.backgroundColor = $event.color.hex;
    this.drawFractal();
  }

  onSaveToFileTriggered() {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
