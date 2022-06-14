import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocUiRoutingModule } from './ui-routing.module';
import { DocUiComponent } from './ui.component';
import { BlizzButtonModule } from '@blizz/ui';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [DocUiComponent, TestComponent],
  imports: [CommonModule, DocUiRoutingModule, BlizzButtonModule],
})
export class DocUiModule {}
