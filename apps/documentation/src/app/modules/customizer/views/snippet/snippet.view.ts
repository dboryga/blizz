import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerService } from '../../customizer.service';

@Component({
  templateUrl: './snippet.view.html',
  styleUrls: ['./snippet.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class DocCustomizerSnippetView {
  constructor(protected readonly service: DocCustomizerService) {}
}
