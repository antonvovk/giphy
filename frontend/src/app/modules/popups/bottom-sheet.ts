import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) {
  }
}
