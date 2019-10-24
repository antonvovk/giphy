import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StartPageComponent} from './modules/start-page/start-page.component';
import {FractalBuilderComponent} from './modules/fractal-builder/fractal-builder.component';
import {ColorModelsComponent} from './modules/color-models/color-models.component';
import {AffineTransformationComponent} from './modules/affine-transformation/affine-transformation.component';


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
