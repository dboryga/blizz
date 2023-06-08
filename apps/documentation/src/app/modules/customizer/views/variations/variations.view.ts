import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerService } from '../../customizer.service';

@Component({
  templateUrl: './variations.view.html',
  styleUrls: ['./variations.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class DocCustomizerVariationsView {
  constructor(protected readonly service: DocCustomizerService) {}
}
