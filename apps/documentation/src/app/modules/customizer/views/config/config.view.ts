import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerService } from '../../customizer.service';
import { DocIconComponent } from '../../../../shared';

@Component({
  templateUrl: './config.view.html',
  styleUrls: ['./config.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocIconComponent],
})
export class DocCustomizerConfigView {
  constructor(protected readonly service: DocCustomizerService) {}

  copyConfig() {
    navigator.clipboard.writeText(this.service.configString);
  }
}
