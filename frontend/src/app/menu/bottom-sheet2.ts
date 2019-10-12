import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-bottom-sheet2',
  templateUrl: 'bottom-sheet2.html',
})
export class BottomSheetOverviewExampleSheet2Component {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet2Component>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
