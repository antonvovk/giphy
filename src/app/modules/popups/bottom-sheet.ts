import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  jpeg() {
    const image = this.data.canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    const test = document.createElement("a");
    test.download = this.data.filename + ".jpg";
    test.href = image;
    test.click();
  }

  png() {
    const image = this.data.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const test = document.createElement("a");
    test.download = this.data.filename + ".png";
    test.href = image;
    test.click();
  }

  tiff() {
    const image = this.data.canvas.toDataURL("image/tiff").replace("image/tiff", "image/octet-stream");
    const test = document.createElement("a");
    test.download = this.data.filename + ".tiff";
    test.href = image;
    test.click();
  }

  webp() {
    const image = this.data.canvas.toDataURL("image/webp").replace("image/webp", "image/octet-stream");
    const test = document.createElement("a");
    test.download = this.data.filename + ".webp";
    test.href = image;
    test.click();
  }

  gif() {
    const image = this.data.canvas.toDataURL("image/gif").replace("image/gif", "image/octet-stream");
    const test = document.createElement("a");
    test.download = this.data.filename + ".gif";
    test.href = image;
    test.click();
  }
}
