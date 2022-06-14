import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocButtonComponent } from "./button.component";
import { DocButtonOverviewComponent } from "./overview/button-overview.component";
import { DocButtonApiComponent } from "./api/button-api.component";

const routes: Routes = [
  {
    path: '',
    component: DocButtonComponent,
    children: [
      { path: 'overview', component: DocButtonOverviewComponent },
      { path: 'api', component: DocButtonApiComponent },
      { path: '**', redirectTo: 'overview' },
    ]
  },
  { path: 'editor', component: DocButtonComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonRoutingModule { }
