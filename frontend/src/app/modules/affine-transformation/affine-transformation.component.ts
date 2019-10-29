import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-affine-transformation',
  templateUrl: './affine-transformation.component.html',
  styleUrls: ['./affine-transformation.component.scss']
})
export class AffineTransformationComponent implements OnInit, AfterViewInit {

  formGroup: FormGroup;

  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('mainContent', {static: false}) mainContent: ElementRef;

  constructor(fb: FormBuilder, private snackBar: MatSnackBar) {
    this.formGroup = fb.group({
      x1: [0, [Validators.min(-10), Validators.max(10)]],
      y1: [0, [Validators.min(-10), Validators.max(10)]],
      x2: [0, [Validators.min(-10), Validators.max(10)]],
      y2: [0, [Validators.min(-10), Validators.max(10)]],
      x3: [0, [Validators.min(-10), Validators.max(10)]],
      y3: [0, [Validators.min(-10), Validators.max(10)]],
      size: [1, [Validators.min(-10), Validators.max(10)]]
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {

  }

  draw(ctx: CanvasRenderingContext2D) {
    const gridSize = 25;
    const xAxisDistanceGridLines = 20;
    const yAxisDistanceGridLines = 27;
    const xAxisStartingPoint = {number: 1, suffix: '\u03a0'};
    const yAxisStartingPoint = {number: 1, suffix: ''};

    const canvasWidth = this.canvas.nativeElement.width;
    const canvasHeight = this.canvas.nativeElement.height;
    const numLinesX = Math.floor(canvasHeight / gridSize);
    const numLinesY = Math.floor(canvasWidth / gridSize);

    // Draw grid lines along X-axis
    for (let i = 0; i <= numLinesX; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;

      // If line represents X-axis draw in different color
      if (i === xAxisDistanceGridLines) {
        ctx.strokeStyle = '#000000';
      } else {
        ctx.strokeStyle = '#e9e9e9';
      }

      if (i === numLinesX) {
        ctx.moveTo(0, gridSize * i);
        ctx.lineTo(canvasWidth, gridSize * i);
      } else {
        ctx.moveTo(0, gridSize * i + 0.5);
        ctx.lineTo(canvasWidth, gridSize * i + 0.5);
      }
      ctx.stroke();
    }

    // Draw grid lines along Y-axis
    for (let i = 0; i <= numLinesY; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;

      // If line represents Y-axis draw in different color
      if (i === yAxisDistanceGridLines) {
        ctx.strokeStyle = '#000000';
      } else {
        ctx.strokeStyle = '#e9e9e9';
      }

      if (i === numLinesY) {
        ctx.moveTo(gridSize * i, 0);
        ctx.lineTo(gridSize * i, canvasHeight);
      } else {
        ctx.moveTo(gridSize * i + 0.5, 0);
        ctx.lineTo(gridSize * i + 0.5, canvasHeight);
      }
      ctx.stroke();
    }

    ctx.translate(yAxisDistanceGridLines * gridSize, xAxisDistanceGridLines * gridSize);
  }

  onSubmit() {
    this.canvas.nativeElement.width = this.mainContent.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.mainContent.nativeElement.offsetHeight;
    const ctx = this.canvas.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.draw(ctx);

    const sizeMultiplier = this.formGroup.get('size').value;
    const x1 = this.formGroup.get('x1').value * sizeMultiplier;
    const y1 = this.formGroup.get('y1').value * sizeMultiplier;
    const x2 = this.formGroup.get('x2').value * sizeMultiplier;
    const y2 = this.formGroup.get('y2').value * sizeMultiplier;
    const x3 = this.formGroup.get('x3').value * sizeMultiplier;
    const y3 = this.formGroup.get('y3').value * sizeMultiplier;

    if (x1 === x2 && x2 === x3 && y1 === y2 && y2 === y3) {
      this.openSnackBar('These point do not form triangle', 'Dismiss');
      return;
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x3, y3);
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();
  }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = this.mainContent.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.mainContent.nativeElement.offsetHeight;
    const ctx = this.canvas.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.draw(ctx);
  }
}
