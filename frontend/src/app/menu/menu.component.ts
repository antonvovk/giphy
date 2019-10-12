import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ColorEvent} from 'ngx-color';
import {MatBottomSheet} from '@angular/material';
import {BottomSheetOverviewExampleSheetComponent} from './bottom-sheet';
import {BottomSheetOverviewExampleSheet2Component} from './bottom-sheet2';

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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

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

  fractalsMenuOpened: boolean;
  colorsMenuOpened: boolean;
  threeDMenuOpened: boolean;

  profileForm = new FormGroup({
    x1: new FormControl(''),
    y1: new FormControl(''),
    x2: new FormControl(''),
    y2: new FormControl(''),
    x3: new FormControl(''),
    y3: new FormControl(''),
    sizeMultiplier: new FormControl(''),
  });

  selectedFile = null;

  @ViewChild('button1', {static: false}) button1: ElementRef;
  @ViewChild('button2', {static: false}) button2: ElementRef;
  @ViewChild('button3', {static: false}) button3: ElementRef;
  @ViewChild('snav', {static: false}) snav: ElementRef;
  @ViewChild('mainContent', {static: false}) mainContent: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('colorsCanvas', {static: false}) colorsCanvas: ElementRef<HTMLCanvasElement>;
  R = 0;
  G = 0;
  B = 0;
  X = 0;
  Y = 0;
  Z = 0;
  brightness = 0;
  contrast = 0;
  colorSpace = 'RGB';

  private imageDataCopy: ImageData;

  constructor(private bottomSheet: MatBottomSheet, private bottomSheet2: MatBottomSheet) {
  }

  ngOnInit() {

  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheetComponent);
  }

  openBottomSheet2(): void {
    this.bottomSheet2.open(BottomSheetOverviewExampleSheet2Component);
  }

  fractals_clicked() {
    this.fractalsMenuOpened = !this.fractalsMenuOpened;
    this.colorsMenuOpened = false;
    this.threeDMenuOpened = false;
    (this.button2 as any).color = 'none';
    (this.button3 as any).color = 'none';

    if (this.fractalsMenuOpened) {
      (this.button1 as any).color = 'primary';
    } else {
      (this.button1 as any).color = 'none';
    }
  }

  colors_clicked() {
    this.colorsMenuOpened = !this.colorsMenuOpened;
    this.fractalsMenuOpened = false;
    this.threeDMenuOpened = false;
    (this.button1 as any).color = 'none';
    (this.button3 as any).color = 'none';

    if (this.colorsMenuOpened) {
      (this.button2 as any).color = 'primary';
    } else {
      (this.button2 as any).color = 'none';
    }
  }

  threeD_clicked() {
    this.threeDMenuOpened = !this.threeDMenuOpened;
    this.fractalsMenuOpened = false;
    this.colorsMenuOpened = false;
    (this.button1 as any).color = 'none';
    (this.button2 as any).color = 'none';

    if (this.threeDMenuOpened) {
      (this.button3 as any).color = 'primary';
    } else {
      (this.button3 as any).color = 'none';
    }
  }

  snav_clicked() {
    (this.snav as any).toggle();
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

    const sizeMultiplier = this.profileForm.get('sizeMultiplier').value;
    const x1 = this.profileForm.get('x1').value * sizeMultiplier;
    const y1 = this.profileForm.get('y1').value * sizeMultiplier;
    const x2 = this.profileForm.get('x2').value * sizeMultiplier;
    const y2 = this.profileForm.get('y2').value * sizeMultiplier;
    const x3 = this.profileForm.get('x3').value * sizeMultiplier;
    const y3 = this.profileForm.get('y3').value * sizeMultiplier;

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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const ctx = this.colorsCanvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.colorsCanvas.nativeElement.width, this.colorsCanvas.nativeElement.height);

    const img = new Image();
    img.onload = () => {
      this.colorsCanvas.nativeElement.width = img.width;
      this.colorsCanvas.nativeElement.height = img.height;
      ctx.drawImage(img, 0, 0);
      this.imageDataCopy = ctx.getImageData(0, 0, this.colorsCanvas.nativeElement.width, this.colorsCanvas.nativeElement.height);
    };

    img.src = URL.createObjectURL(this.selectedFile);
  }

  onImageChaneRGB() {
    const ctx = this.colorsCanvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.colorsCanvas.nativeElement.width, this.colorsCanvas.nativeElement.height);
    this.applyRGB(imageData.data, this.R, this.G, this.B);
    ctx.putImageData(imageData, 0, 0);
  }

  onImageChaneXYZ() {
    const ctx = this.colorsCanvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.colorsCanvas.nativeElement.width, this.colorsCanvas.nativeElement.height);
    this.applyXYZ(imageData.data, this.X, this.Y, this.Z);
    ctx.putImageData(imageData, 0, 0);
  }

  onImageChangeBrightness() {
    const ctx = this.colorsCanvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.colorsCanvas.nativeElement.width, this.colorsCanvas.nativeElement.height);
    this.applyBrightness(imageData.data, this.brightness);
    ctx.putImageData(imageData, 0, 0);
  }

  onImageReset() {
    this.onUpload();

    if (this.colorSpace === 'RGB') {
      this.R = 0;
      this.G = 0;
      this.B = 0;
    } else {
      this.X = 0;
      this.Y = 0;
      this.Z = 0;
    }

    this.brightness = 0;
    this.contrast = 0;
  }

  onImageChangeContrast() {
    const ctx = this.colorsCanvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.colorsCanvas.nativeElement.width, this.colorsCanvas.nativeElement.height);
    this.applyContrast(imageData.data, this.contrast);
    ctx.putImageData(imageData, 0, 0);
  }

  applyBrightness(data, brightness) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = this.imageDataCopy.data[i] + (255 * (brightness / 100));
      data[i + 1] = this.imageDataCopy.data[i + 1] + (255 * (brightness / 100));
      data[i + 2] = this.imageDataCopy.data[i + 2] + (255 * (brightness / 100));
    }
  }

  applyContrast(data, contrast) {
    const factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = this.truncateColor(factor * (this.imageDataCopy.data[i] - 128.0) + 128.0);
      data[i + 1] = this.truncateColor(factor * (this.imageDataCopy.data[i + 1] - 128.0) + 128.0);
      data[i + 2] = this.truncateColor(factor * (this.imageDataCopy.data[i + 2] - 128.0) + 128.0);
    }
  }

  applyRGB(data, R: number, G: number, B: number) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = this.truncateColor(this.imageDataCopy.data[i] + R);
      data[i + 1] = this.truncateColor(this.imageDataCopy.data[i + 1] + G);
      data[i + 2] = this.truncateColor(this.imageDataCopy.data[i + 2] + B);
    }
  }

  applyXYZ(data, X: number, Y: number, Z: number) {
    for (let i = 0; i < data.length; i += 4) {
      const XYZ = this.convertRGBtoXYZ(this.imageDataCopy.data[i], this.imageDataCopy.data[i + 1], this.imageDataCopy.data[i + 2]);
      const newX = this.truncateX(X + XYZ[0]);
      const newY = this.truncateY(Y + XYZ[1]);
      const newZ = this.truncateZ(Z + XYZ[2]);
      const RGB = this.convertXYZtoRGB(newX, newY, newZ);

      data[i] = RGB[0];
      data[i + 1] = RGB[1];
      data[i + 2] = RGB[2];
    }
  }

  truncateColor(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 255) {
      value = 255;
    }

    return value;
  }

  truncateX(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 95.05) {
      value = 95.05;
    }

    return value;
  }

  truncateY(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    return value;
  }

  truncateZ(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 108.88) {
      value = 108.88;
    }

    return value;
  }

  convertRGBtoXYZ(R: number, G: number, B: number) {
    let varR = (R / 255.0);
    let varG = (G / 255.0);
    let varB = (B / 255.0);

    if (varR > 0.04045) {
      varR = Math.pow((varR + 0.055) / 1.055, 2.4);
    } else {
      varR = varR / 12.92;
    }
    if (varG > 0.04045) {
      varG = Math.pow((varG + 0.055) / 1.055, 2.4);
    } else {
      varG = varG / 12.92;
    }
    if (varB > 0.04045) {
      varB = Math.pow((varB + 0.055) / 1.055, 2.4);
    } else {
      varB = varB / 12.92;
    }

    varR = varR * 100;
    varG = varG * 100;
    varB = varB * 100;

    const X = varR * 0.4124 + varG * 0.3576 + varB * 0.1805;
    const Y = varR * 0.2126 + varG * 0.7152 + varB * 0.0722;
    const Z = varR * 0.0193 + varG * 0.1192 + varB * 0.9505;

    return [X, Y, Z];
  }

  convertXYZtoRGB(X: number, Y: number, Z: number) {
    const varX = X / 100;
    const varY = Y / 100;
    const varZ = Z / 100;

    let varR = varX * 3.2406 + varY * -1.5372 + varZ * -0.4986;
    let varG = varX * -0.9689 + varY * 1.8758 + varZ * 0.0415;
    let varB = varX * 0.0557 + varY * -0.2040 + varZ * 1.0570;

    if (varR > 0.0031308) {
      varR = 1.055 * (Math.pow(varR, 1 / 2.4)) - 0.055;
    } else {
      varR = 12.92 * varR;
    }
    if (varG > 0.0031308) {
      varG = 1.055 * (Math.pow(varR, 1 / 2.4)) - 0.055;
    } else {
      varG = 12.92 * varG;
    }
    if (varB > 0.0031308) {
      varB = 1.055 * (Math.pow(varR, 1 / 2.4)) - 0.055;
    } else {
      varB = 12.92 * varB;
    }

    const R = varR * 255;
    const G = varG * 255;
    const B = varB * 255;

    return [R, G, B];
  }

  onSaveImage() {
    const dataURL = this.colorsCanvas.nativeElement.toDataURL('image/png');
    // this.downloadImage(dataURL, 'graphify.png');
    this.openBottomSheet();
  }

  downloadImage(data, filename) {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }

  fractalSelectValueChanged() {
    console.log(this.fractalControl.value);
  }

  handleChangeComplete1($event: ColorEvent) {

  }

  handleChangeComplete2($event: ColorEvent) {

  }

  onFractalSave() {
    this.openBottomSheet2();
  }
}
