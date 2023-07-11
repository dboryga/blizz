import { NgModule } from '@angular/core';
import { BlizzExpansionPanelIndicatorComponent } from './components/expansion-panel-indicator.component';
import { BlizzExpansionPanelContentComponent } from './components/expansion-panel-content.component';
import { BlizzExpansionPanelTriggerComponent } from './components/expansion-panel-trigger.component';
import { BlizzExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  imports: [
    BlizzExpansionPanelComponent,
    BlizzExpansionPanelTriggerComponent,
    BlizzExpansionPanelContentComponent,
    BlizzExpansionPanelIndicatorComponent,
  ],
  exports: [
    BlizzExpansionPanelComponent,
    BlizzExpansionPanelTriggerComponent,
    BlizzExpansionPanelContentComponent,
    BlizzExpansionPanelIndicatorComponent,
  ],
})
export class BlizzExpansionPanelModule {}
