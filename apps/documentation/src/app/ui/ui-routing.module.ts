import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocUiComponent } from "./ui.component";

const routes: Routes = [
  { path: '', component: DocUiComponent },
  { path: 'button', loadChildren: () => import('./button/button.module').then(m => m.ButtonModule) },
  { path: 'button', loadChildren: () => import('./button/button.module').then(m => m.ButtonModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocUiRoutingModule { }
