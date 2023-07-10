import { ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ExpansionPanelService } from '../expansion-panel.service';

@Component({
  selector: 'bzz-expansion-panel-indicator',
  template: `<ng-template #templateRef><ng-content></ng-content></ng-template>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlizzExpansionPanelIndicatorComponent {
  readonly service = inject(ExpansionPanelService);

  @ViewChild('templateRef', { static: true }) templateRef!: TemplateRef<unknown>;
}
