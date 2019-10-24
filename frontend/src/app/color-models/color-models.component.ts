import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-color-models',
  templateUrl: './color-models.component.html',
  styleUrls: ['./color-models.component.scss']
})
export class ColorModelsComponent implements OnInit {

  selectedFile = null;

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

  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('mainContent', {static: false}) mainContent: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    const img = new Image();
    img.onload = () => {
      this.canvas.nativeElement.width = img.width;
      this.canvas.nativeElement.height = img.height;
      ctx.drawImage(img, 0, 0);
      this.imageDataCopy = ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    };

    img.src = URL.createObjectURL(this.selectedFile);
  }

  onImageChaneRGB() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.applyRGB(imageData.data, this.R, this.G, this.B);
    ctx.putImageData(imageData, 0, 0);
  }

  onImageChaneXYZ() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.applyXYZ(imageData.data, this.X, this.Y, this.Z);
    ctx.putImageData(imageData, 0, 0);
  }

  onImageChangeBrightness() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
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
    const ctx = this.canvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
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
    const dataURL = this.canvas.nativeElement.toDataURL('image/png');
    this.downloadImage(dataURL, 'graphify.png');
  }

  downloadImage(data, filename) {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }
}
