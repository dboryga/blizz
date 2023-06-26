import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerService } from '../../customizer.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DocCustomizerElementsControlsComponent } from '../../components/elements-controls/elements-controls.component';

@UntilDestroy()
@Component({
  templateUrl: './elements.view.html',
  styleUrls: ['./elements.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocCustomizerElementsControlsComponent],
})
export class DocCustomizerElementsView implements OnInit {
  constructor(
    protected readonly service: DocCustomizerService,
    protected readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.service.detectChanges$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeDetector.markForCheck());
  }
}
