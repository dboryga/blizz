import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlizzComponent } from '../../models/component.model';
import { getVariationConfig, injectComponentConfig } from '../../config';

@Component({
  selector: 'bzz-icon',
  template: '<ng-content></ng-content>',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class BlizzIconComponent implements BlizzComponent {
  static instanceIdx = 0;
  readonly componentKey = 'icon';
  readonly config = injectComponentConfig(this.componentKey);

  @Input()
  @HostBinding('id')
  id = `bzz-${this.componentKey}-${BlizzIconComponent.instanceIdx++}`;

  @Input()
  @HostBinding('attr.variation')
  variation?: string | null;

  get variationConfig() {
    return getVariationConfig(this.config, this.variation);
  }

  constructor(public readonly changeDetector: ChangeDetectorRef) {}

  @HostBinding('role')
  get hostRole() {
    return 'img';
  }
}
