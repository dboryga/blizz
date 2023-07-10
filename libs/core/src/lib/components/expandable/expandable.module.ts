import { NgModule } from '@angular/core';
import { BlizzCdkExpandableTriggerDirective } from './expandable-trigger.directive';
import { BlizzCdkExpandableDirective } from './expandable.directive';

@NgModule({
  imports: [BlizzCdkExpandableDirective, BlizzCdkExpandableTriggerDirective],
  exports: [BlizzCdkExpandableDirective, BlizzCdkExpandableTriggerDirective],
})
export class BlizzCdkExpandableModule {}
