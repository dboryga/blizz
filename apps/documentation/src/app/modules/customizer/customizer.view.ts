import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerPreviewComponent } from './components/preview/preview.component';
import { BlizzChipComponent, BlizzInputComponent } from '@blizz/ui';
import { DocCustomizerService } from './customizer.service';
import { DocCustomizerSidebarComponent } from './components/sidebar/sidebar.component';
import { DocIconComponent } from '../../shared';

@Component({
  selector: 'doc-customizer',
  templateUrl: './customizer.view.html',
  styleUrls: ['./customizer.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    BlizzChipComponent,
    BlizzInputComponent,
    DocCustomizerSidebarComponent,
    DocCustomizerPreviewComponent,
    DocIconComponent,
  ],
  providers: [DocCustomizerService],
})
export class DocCustomizerView {
  constructor(protected readonly service: DocCustomizerService) {}
}
