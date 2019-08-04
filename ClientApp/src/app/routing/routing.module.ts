import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { routes } from './routes';



@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
})
export class RoutingModule { }
