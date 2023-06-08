import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { slideSidenavAnimation } from '../../animations/slide-sidenav.animation';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DocCustomizerService } from '../../customizer.service';

@UntilDestroy()
@Component({
  selector: 'doc-customizer-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  animations: [slideSidenavAnimation],
})
export class DocCustomizerPreviewComponent {
  @ViewChild('preview', { static: true }) protected previewElement!: ElementRef<HTMLDivElement>;

  constructor(protected readonly service: DocCustomizerService) {}
}
