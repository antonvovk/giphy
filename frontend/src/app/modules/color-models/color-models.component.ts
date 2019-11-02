import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ColorModel} from '../../services/color-models/color-model';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BottomSheetComponent} from "../popups/bottom-sheet";

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
    //ColorModel.applyRGB(imageData, this.R, this.G, this.B);
    ctx.putImageData(imageData, 0, 0);
  }

  onImageChaneXYZ() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //ColorModel.applyXYZ(imageData, this.X, this.Y, this.Z);
    ctx.putImageData(imageData, 0, 0);
  }

  onImageChangeBrightness() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //ColorModel.applyBrightness(imageData, this.brightness);
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
    ColorModel.applyContrast(imageData, this.contrast);
    ctx.putImageData(imageData, 0, 0);
  }



  onSaveImage() {
    this.bottomSheet.open(BottomSheetComponent);
    //const dataURL = this.canvas.nativeElement.toDataURL('image/png');
    //this.downloadImage(dataURL, 'graphify.png');
  }

  downloadImage(data, filename) {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }
}
