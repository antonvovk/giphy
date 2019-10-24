import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ColorSketchModule} from 'ngx-color/sketch';
import {ColorTwitterModule} from 'ngx-color/twitter';
import {StartPageComponent} from './start-page/start-page.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FractalBuilderComponent} from './fractal-builder/fractal-builder.component';
import {ColorModelsComponent} from './color-models/color-models.component';
import {AffineTransformationComponent} from './affine-transformation/affine-transformation.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    NavbarComponent,
    FractalBuilderComponent,
    ColorModelsComponent,
    AffineTransformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatMenuModule,
    ColorSketchModule,
    ColorTwitterModule,
    MatDialogModule,
    MatBottomSheetModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
