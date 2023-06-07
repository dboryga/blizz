import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getVariationConfig, injectComponentConfig } from '../../config';
import { BlizzComponent } from '../../models/component.model';

let instanceIdx = 0;

@Component({
  selector: 'bzz-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class BlizzChipComponent implements BlizzComponent {
  readonly componentName = 'chip';
  readonly config = injectComponentConfig(this.componentName);

  @HostBinding('id')
  readonly id = `bzz-${this.componentName}-${instanceIdx++}` as const;

  @Input()
  @HostBinding('attr.variation')
  variation: string | null = null;

  get variationConfig() {
    return getVariationConfig(this.config, this.variation);
  }
}
