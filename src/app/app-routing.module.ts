import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './modules/start-page/start-page.component';
import {FractalBuilderComponent} from './modules/fractal-builder/fractal-builder.component';
import {ColorModelsComponent} from './modules/color-models/color-models.component';
import {AffineTransformationComponent} from './modules/affine-transformation/affine-transformation.component';
import {AboutComponent} from './modules/about/about.component';
import {TutorialComponent} from './modules/tutorial/tutorial.component';


const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'fractals-builder', component: FractalBuilderComponent},
  {path: 'color-models', component: ColorModelsComponent},
  {path: 'affine-transformation', component: AffineTransformationComponent},
  {path: 'about-us', component: AboutComponent},
  {path: 'educational-materials', component: TutorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
