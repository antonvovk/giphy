import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ColorModel} from "../../services/color-models/color-model";
import {BottomSheetComponent} from "../popups/bottom-sheet";

@Component({
  selector: 'app-color-models',
  templateUrl: './color-models.component.html',
  styleUrls: ['./color-models.component.scss']
})
export class ColorModelsComponent implements OnInit {

  selectedFile = null;
  brightness = 0;

  imgRGB: ImageData;
  image: HTMLImageElement;

  R = 0;
  G = 0;
  B = 0;

  X = '';
  Y = '';
  Z = '';

  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('mainContent', {static: false}) mainContent: ElementRef;

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    const image = new Image();
    image.src = URL.createObjectURL(this.selectedFile);

    image.onload = () => {
      this.canvas.nativeElement.width = image.width * 2;
      this.canvas.nativeElement.height = image.height * 2;
      this.imgRGB = this.getImageData(image);
      this.image = image;
      ctx.putImageData(this.imgRGB, 0, 0);
      ctx.putImageData(ColorModel.convertToXYZ(this.imgRGB), image.width, 0);
    };
  }

  getImageData(image: HTMLImageElement): ImageData {
    const tmpCanvas = document.createElement('canvas');
    const ctx = tmpCanvas.getContext('2d');
    tmpCanvas.width = image.width;
    tmpCanvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, image.width, image.height);
  }

  findPos(obj) {
    let curleft = 0, curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj == obj.offsetParent);
      return {x: curleft, y: curtop};
    }
    return undefined;
  }

  mousemove(event) {
    const pos = this.findPos(this.canvas.nativeElement);
    const x = event.clientX - pos.x;
    const y = event.clientY - pos.y;
    const p = this.canvas.nativeElement.getContext('2d').getImageData(x, y, 1, 1).data;
    this.R = p[0];
    this.G = p[1];
    this.B = p[2];

    const xyz = ColorModel.convertRGBtoXYZ(p[0], p[1], p[2]);
    this.X = xyz[0].toFixed(4);
    this.Y = xyz[1].toFixed(4);
    this.Z = xyz[2].toFixed(4);
  }

  brightnessChanged() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.canvas.nativeElement.width = this.imgRGB.width * 2;
    this.canvas.nativeElement.height = this.imgRGB.height * 2;
    this.imgRGB = this.getImageData(this.image);
    ctx.putImageData(ColorModel.applyBrightness(this.imgRGB, this.brightness), 0, 0);
    ctx.putImageData(ColorModel.convertToXYZ(ColorModel.applyBrightness(this.imgRGB, this.brightness)), this.imgRGB.width, 0);
  }

  saveTrigered() {
    const tmpCanvas = document.createElement('canvas');
    const ctx = tmpCanvas.getContext('2d');
    tmpCanvas.width = this.image.width;
    tmpCanvas.height = this.image.height;
    ctx.putImageData(ColorModel.convertToXYZ(this.getImageData(this.image)), 0, 0);

    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        canvas: tmpCanvas,
        filename: this.selectedFile.name + 'XYZ'
      }
    });
  }

  resetTriggered() {
    this.brightness = 0;
    this.brightnessChanged();
  }
}
