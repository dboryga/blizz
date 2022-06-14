import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.DocUiModule) },
  { path: '', pathMatch: 'full', redirectTo: 'ui' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DocAppRoutingModule { }
