import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectComponentConfig } from '../../config';
import { BlizzComponent } from '../../models/component.models';

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
  @HostBinding('attr.variation')
  @Input()
  variation: string | null = null;

  readonly config = injectComponentConfig('chip');
}
