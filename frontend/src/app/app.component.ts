import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Graphify';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'fractals_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/fractals_logo.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'colors_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/colors_logo.svg')
    );

    this.matIconRegistry.addSvgIcon(
      '3d_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/3d_logo.svg')
    );
  }
}
