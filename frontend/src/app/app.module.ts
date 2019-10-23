import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuComponent} from './menu/menu.component';
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
import {BottomSheetOverviewExampleSheetComponent} from './menu/bottom-sheet';
import {BottomSheetOverviewExampleSheet2Component} from './menu/bottom-sheet2';
import { StartPageComponent } from './start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BottomSheetOverviewExampleSheetComponent,
    BottomSheetOverviewExampleSheet2Component,
    StartPageComponent
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
  ],
  entryComponents: [
    BottomSheetOverviewExampleSheetComponent,
    BottomSheetOverviewExampleSheet2Component
  ]
})
export class AppModule { }
