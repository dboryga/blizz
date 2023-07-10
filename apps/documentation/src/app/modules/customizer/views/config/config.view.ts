import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerService } from '../../customizer.service';
import { DocIconComponent } from '../../../../shared';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'doc-customizer-config',
  templateUrl: './config.view.html',
  styleUrls: ['./config.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocIconComponent],
})
export class DocCustomizerConfigView implements OnInit {
  protected configString?: string;

  constructor(
    protected readonly service: DocCustomizerService,
    protected readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.configString = this.service.configString;
    this.service.detectChanges$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeDetector.markForCheck());
  }

  copyConfig() {
    navigator.clipboard.writeText(this.service.configString);
  }
}
