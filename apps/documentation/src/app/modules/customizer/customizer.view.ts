import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerPreviewComponent } from './components/preview/preview.component';
import {
  BlizzButtonComponent,
  BlizzChipComponent,
  BlizzIconComponent,
  BlizzInputComponent,
} from '@blizz/ui';
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
    BlizzIconComponent,
    BlizzButtonComponent,
  ],
  providers: [DocCustomizerService],
})
export class DocCustomizerView {
  constructor(protected readonly service: DocCustomizerService) {}
}
