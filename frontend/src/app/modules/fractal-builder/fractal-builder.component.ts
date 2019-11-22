import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HFractal} from '../../services/fractals/geometric/h-fractal';
import {LevyCCurve} from '../../services/fractals/geometric/levy-c-curve';
import {MinkowskiCurve} from '../../services/fractals/geometric/minkowski-curve';
import {KochLine} from '../../services/fractals/ifs/koch-line';
import {DragonCurve} from '../../services/fractals/ifs/dragon-curve';
import {ColorEvent} from 'ngx-color';
import {FractalDrawer} from '../../services/fractals/fractal-drawer';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from '../popups/bottom-sheet';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-fractal-builder',
  templateUrl: './fractal-builder.component.html',
  styleUrls: ['./fractal-builder.component.scss']
})
export class FractalBuilderComponent {

  formGroup: FormGroup;
  curMax = 0;

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
  lineColors = ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
    '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
    '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];

  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('mainContent', {static: false}) mainContent: ElementRef;

  constructor(fb: FormBuilder, private bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar) {
    this.formGroup = fb.group({
      iterations: [1, [Validators.min(0), Validators.max(20)]],
      lineThickness: [1, [Validators.min(1), Validators.max(10)]],
      fractalControl: ['none']
    });
  }

  drawFractal() {
    if (this.formGroup.get('iterations').value == this.curMax) {
      this._snackBar.open('Max iterations reached', 'Dismiss', {
        duration: 2000,
      });
    }

    if (!this.valid() || this.formGroup.get('lineThickness').invalid) {
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
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        canvas: this.canvas.nativeElement,
        filename: this.formGroup.get('fractalControl').value
      }
    });
  }

  valid(): boolean {
    const iter = this.formGroup.get('iterations').value;
    switch (this.formGroup.get('fractalControl').value) {
      case 'h-fractal':
        this.curMax = 8;
        return iter >= 0 && iter <= 8;
      case 'levy-c-curve':
        this.curMax = 15;
        return iter >= 0 && iter <= 15;
      case 'minkowski-sausage':
        this.curMax = 6;
        return iter >= 0 && iter <= 6;
      case 'koch-snowflake':
        this.curMax = 10;
        return iter >= 0 && iter <= 10;
      case 'dragon-curve':
        this.curMax = 15;
        return iter >= 0 && iter <= 15;
      default:
        return;
    }
  }

  clearFormValues() {
    this.formGroup.patchValue({iterations: 1, lineThickness: 1});
    this.drawFractal();
  }
}
