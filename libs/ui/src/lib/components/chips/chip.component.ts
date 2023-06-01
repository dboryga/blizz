import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectComponentConfig } from '../../config';
import { BlizzComponentConfigName } from '../../models';

@Component({
  selector: 'bzz-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class BlizzChipComponent {
  readonly config = injectComponentConfig(BlizzComponentConfigName.Chips);
}
