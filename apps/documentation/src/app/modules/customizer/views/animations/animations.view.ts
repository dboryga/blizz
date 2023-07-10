import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerService } from '../../customizer.service';

@Component({
  selector: 'doc-customizer-animations',
  templateUrl: './animations.view.html',
  styleUrls: ['./animations.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class DocCustomizerAnimationsView {
  constructor(protected readonly service: DocCustomizerService) {}
}
