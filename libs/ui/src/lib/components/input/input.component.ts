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
  selector: 'bzz-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class BlizzInputComponent implements BlizzComponent {
  @HostBinding('attr.variation')
  @Input()
  variation: string | null = null;

  readonly config = injectComponentConfig('input');
}
