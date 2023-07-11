import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostBinding,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { BlizzComponent } from '../../models';
import { getVariationConfig, injectComponentConfig } from '../../config';
import { BlizzIconComponent } from '../icon/icon.component';

@Component({
  selector: '[bzz-icon-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./icon-button.component.scss'],
  standalone: true,
  exportAs: 'bzzIconButton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BlizzIconButtonComponent implements BlizzComponent {
  static instanceIdx = 0;
  readonly componentKey = 'iconButton';
  readonly config = injectComponentConfig(this.componentKey);
  readonly changeDetector = inject(ChangeDetectorRef);

  @Input()
  @HostBinding('id')
  id = `bzz-${this.componentKey}-${BlizzIconButtonComponent.instanceIdx++}`;

  @Input()
  @HostBinding('attr.variation')
  set variation(value) {
    this._variation = value;
  }
  get variation() {
    return this._variation;
  }
  private _variation: string | null = null;

  get variationConfig() {
    return getVariationConfig(this.config, this._variation);
  }

  @ContentChild(BlizzIconComponent) set _iconComponentRef(v: BlizzIconComponent) {
    if (!v) return;
    v.variation = this.config.elements.icon?.styles.variation;
  }
}
