import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DocCustomizerService } from '../../customizer.service';
import { DocIconComponent } from '../../../../shared';
import { camelToTitleCase } from '@blizz-ui/core';

@UntilDestroy()
@Component({
  selector: 'doc-customizer-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocIconComponent],
})
export class DocCustomizerPreviewComponent implements OnInit {
  readonly camelToTitleCase = camelToTitleCase;

  @ContentChild('previewElement') set componentRef(v: any) {
    this.service.previewComponent = v;
  }

  @ContentChild('previewElement', { read: ElementRef }) set elementRef(v: ElementRef) {
    this.service.previewElement = v.nativeElement;
  }

  constructor(
    protected readonly service: DocCustomizerService,
    protected readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.service.detectChanges$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeDetector.detectChanges());
  }
}
