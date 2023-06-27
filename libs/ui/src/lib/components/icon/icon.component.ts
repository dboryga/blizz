import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
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
  readonly componentKey = 'input';
  readonly config = injectComponentConfig(this.componentKey);
  readonly computedStyles = getComputedStyle(this.hostElementRef.nativeElement);

  @HostBinding('id')
  readonly id = `bzz-${this.componentKey}-${BlizzIconComponent.instanceIdx++}` as const;

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

  @HostBinding('role')
  get hostRole() {
    return 'img';
  }
}
