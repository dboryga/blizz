import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerService } from '../../customizer.service';

@Component({
  templateUrl: './states.view.html',
  styleUrls: ['./states.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class DocCustomizerStatesView {
  constructor(protected readonly service: DocCustomizerService) {}
}
