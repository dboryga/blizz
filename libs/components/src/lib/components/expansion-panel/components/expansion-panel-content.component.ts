import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlizzCdkExpandableDirective } from '@blizz-ui/core';
import { ExpansionPanelService } from '../expansion-panel.service';

@Component({
  selector: 'bzz-expansion-panel-content',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  hostDirectives: [BlizzCdkExpandableDirective],
})
export class BlizzExpansionPanelContentComponent {
  readonly directive = inject(BlizzCdkExpandableDirective);
  readonly service = inject(ExpansionPanelService);
}
