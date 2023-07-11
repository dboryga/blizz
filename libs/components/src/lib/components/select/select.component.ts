import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  inject,
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
  readonly hostElementRef = inject(ElementRef<HTMLElement>);
  readonly changeDetector = inject(ChangeDetectorRef);
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

  @Input() placeholder?: string;
}
