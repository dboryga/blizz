import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonRoutingModule } from './button-routing.module';
import { DocButtonComponent } from './button.component';
import { DocButtonOverviewComponent } from './overview/button-overview.component';
import { DocButtonApiComponent } from './api/button-api.component';
import { DocButtonEditorComponent } from './editor/button-editor.component';

@NgModule({
  declarations: [
    DocButtonComponent,
    DocButtonOverviewComponent,
    DocButtonApiComponent,
    DocButtonEditorComponent,
  ],
  imports: [CommonModule, ButtonRoutingModule],
})
export class ButtonModule {}
