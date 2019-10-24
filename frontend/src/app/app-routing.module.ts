import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StartPageComponent} from './start-page/start-page.component';
import {FractalBuilderComponent} from './fractal-builder/fractal-builder.component';
import {ColorModelsComponent} from './color-models/color-models.component';
import {AffineTransformationComponent} from './affine-transformation/affine-transformation.component';


const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'fractals-builder', component: FractalBuilderComponent},
  {path: 'color-models', component: ColorModelsComponent},
  {path: 'affine-transformation', component: AffineTransformationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
