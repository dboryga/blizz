import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerService } from '../../customizer.service';

@Component({
  templateUrl: './elements.view.html',
  styleUrls: ['./elements.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class DocCustomizerElementsView {
  constructor(protected readonly service: DocCustomizerService) {}
}
