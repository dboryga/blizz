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
import { BlizzInputComponent } from '@blizz/ui';
import { FormsModule } from '@angular/forms';
import { DocIconComponent } from '../../../../shared';

@UntilDestroy()
@Component({
  selector: 'doc-customizer-general',
  templateUrl: './general.view.html',
  styleUrls: ['./general.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, BlizzInputComponent, FormsModule, DocIconComponent],
})
export class DocCustomizerGeneralView implements OnInit {
  constructor(
    protected readonly service: DocCustomizerService,
    protected readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.service.detectChanges$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeDetector.markForCheck());
  }

  protected readonly untilDestroyed = untilDestroyed;
  protected readonly stop = stop;
}
