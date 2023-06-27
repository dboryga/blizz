import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DocCustomizerService } from '../../customizer.service';
import { SidebarElements, SidebarProperty } from '../../utils/sidebar-data';
import { BlizzExpandableModule, camelToTitleCase } from '@blizz/core';
import { DocIconComponent } from '../../../../shared';
import { FormsModule } from '@angular/forms';
import { BlizzInputComponent } from '@blizz/ui';

@UntilDestroy()
@Component({
  selector: 'doc-customizer-elements-controls',
  templateUrl: './elements-controls.component.html',
  styleUrls: ['./elements-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    BlizzExpandableModule,
    DocIconComponent,
    FormsModule,
    BlizzInputComponent,
  ],
})
export class DocCustomizerElementsControlsComponent implements OnInit {
  @Input() elements?: SidebarElements | null;

  @Input() nested = false;

  constructor(
    protected readonly service: DocCustomizerService,
    protected readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.service.detectChanges$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeDetector.detectChanges());
  }

  protected updateProperty(sidebarProp: SidebarProperty, value: string) {
    this.service.updateProperty$.next({ sidebarProp, value });
  }

  protected readonly camelToTitleCase = camelToTitleCase;
}
