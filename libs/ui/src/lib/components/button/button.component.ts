import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
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
  readonly computedStyles = getComputedStyle(this.hostElementRef.nativeElement);

  @HostBinding('id')
  readonly id = `bzz-${this.componentKey}-${BlizzButtonComponent.instanceIdx++}` as const;

  @Input()
  @HostBinding('attr.variation')
  variation?: string | null;

  get variationConfig() {
    return getVariationConfig(this.config, this.variation);
  }

  constructor(
    public readonly hostElementRef: ElementRef<HTMLElement>,
    public readonly changeDetector: ChangeDetectorRef,
  ) {}
}
