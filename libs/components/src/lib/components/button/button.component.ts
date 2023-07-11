import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { BlizzComponent } from '../../models';
import { getVariationConfig, injectComponentConfig } from '../../config';

@Component({
  selector: '[bzz-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  exportAs: 'bzzButton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BlizzButtonComponent implements BlizzComponent {
  static instanceIdx = 0;
  readonly componentKey = 'button';
  readonly config = injectComponentConfig(this.componentKey);
  readonly changeDetector = inject(ChangeDetectorRef);

  @Input()
  @HostBinding('id')
  id = `bzz-${this.componentKey}-${BlizzButtonComponent.instanceIdx++}`;

  @Input()
  @HostBinding('attr.variation')
  variation?: string | null;

  get variationConfig() {
    return getVariationConfig(this.config, this.variation);
  }
}
