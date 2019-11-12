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
import {StartPageComponent} from './modules/start-page/start-page.component';
import {NavbarComponent} from './modules/navbar/navbar.component';
import {FractalBuilderComponent} from './modules/fractal-builder/fractal-builder.component';
import {ColorModelsComponent} from './modules/color-models/color-models.component';
import {AffineTransformationComponent} from './modules/affine-transformation/affine-transformation.component';
import {BottomSheetComponent} from './modules/popups/bottom-sheet';
import {AboutComponent} from './modules/about/about.component';
import {TutorialComponent} from './modules/tutorial/tutorial.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ColorCompactModule} from "ngx-color/compact";

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    NavbarComponent,
    FractalBuilderComponent,
    ColorModelsComponent,
    AffineTransformationComponent,
    BottomSheetComponent,
    AboutComponent,
    TutorialComponent
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
    FormsModule,
    MatExpansionModule,
    MatSnackBarModule,
    ColorCompactModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    BottomSheetComponent
  ]
})
export class AppModule {
}
