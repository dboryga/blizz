import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';
import { BlizzIconComponent } from '../../icon';
import { CommonModule } from '@angular/common';
import { BlizzExpansionPanelIndicatorComponent } from './expansion-panel-indicator.component';
import { BlizzCdkExpandableTriggerDirective } from '@blizz-ui/core';
import { ExpansionPanelService } from '../expansion-panel.service';
import { BlizzService } from '../../../blizz.service';

@Component({
  selector: 'bzz-expansion-panel-trigger',
  template: `
    <div class="bzz-expansion-panel__trigger-content">
      <ng-content></ng-content>
    </div>

    <ng-container
      *ngIf="indicatorComponent; else defaultIndicator"
      [ngTemplateOutlet]="indicatorComponent.templateRef"
    ></ng-container>

    <ng-template #defaultIndicator>
      <button
        class="bzz-expansion-panel__default-indicator btn-icon arrow"
        [title]="service.expanded ? 'collapse' : 'expand'"
        [style.order]="indicatorStyles && indicatorStyles.position === 'start' ? '-1' : '1'"
        (click)="indicatorClick.emit($event)"
      >
        <bzz-icon>{{ defaultIndicatorStyles?.icon ?? 'expand_more' }}</bzz-icon>
      </button>
    </ng-template>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BlizzIconComponent, CommonModule],
  hostDirectives: [
    {
      directive: BlizzCdkExpandableTriggerDirective,
      inputs: [
        'bzzExpandableTriggerCanExpand: canExpand',
        'bzzExpandableTriggerCanCollapse: canCollapse',
      ],
    },
  ],
})
export class BlizzExpansionPanelTriggerComponent {
  readonly directive = inject(BlizzCdkExpandableTriggerDirective);
  readonly service = inject(ExpansionPanelService);

  get config() {
    return this.service.hostRef?.config;
  }

  get indicatorStyles() {
    return this.config?.elements.indicator?.styles;
  }

  get defaultIndicatorStyles() {
    return this.config?.elements.defaultIndicator?.styles;
  }

  get hovering() {
    return this._hovering;
  }
  private _hovering = false;

  @ContentChild(BlizzExpansionPanelIndicatorComponent)
  indicatorComponent?: BlizzExpansionPanelIndicatorComponent;

  @Output() indicatorClick = new EventEmitter<MouseEvent>();

  private _getDefaultIndicatorComputedProperty(propertyKey: string) {
    if (!this.service.hostRef) return null;
    return this.service.hostRef.computedStyles.getPropertyValue(
      BlizzService.getCssVariable(
        this.service.hostRef.componentKey,
        'defaultIndicator',
        propertyKey,
      ),
    );
  }

  @HostListener('mouseenter')
  private _onMouseEnter() {
    this._hovering = true;
  }

  @HostListener('mouseleave')
  private _onMouseLeave() {
    this._hovering = false;
  }
}
