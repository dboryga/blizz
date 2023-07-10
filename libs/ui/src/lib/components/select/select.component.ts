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
import { getVariationConfig, injectComponentConfig } from '../../config';
import { BlizzComponent } from '../../models/component.model';

@Component({
  selector: 'select[bzz-select]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class BlizzSelectComponent implements BlizzComponent {
  static instanceIdx = 0;
  readonly componentKey = 'select';
  readonly config = injectComponentConfig(this.componentKey);
  readonly computedStyles = getComputedStyle(this.hostElementRef.nativeElement);

  @Input()
  @HostBinding('id')
  id = `bzz-${this.componentKey}-${BlizzSelectComponent.instanceIdx++}`;

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

  @Input() placeholder?: string;
}
