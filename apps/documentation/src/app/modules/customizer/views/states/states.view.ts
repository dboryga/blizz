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
import {
  BlizzCdkExpandableDirective,
  BlizzCdkExpandableModule,
  kebabToTitleCase,
} from '@blizz-ui/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DocIconComponent } from '../../../../shared';
import { BlizzTextFieldComponent } from '@blizz-ui/components';
import { FormsModule } from '@angular/forms';
import { DocCustomizerElementsControlsComponent } from '../../components/elements-controls/elements-controls.component';
import { DocExpansionToggleComponent } from '../../../../shared/components/expansion-toggle/expansion-toggle.component';

@UntilDestroy()
@Component({
  selector: 'doc-customizer-states',
  templateUrl: './states.view.html',
  styleUrls: ['./states.view.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DocIconComponent,
    BlizzCdkExpandableModule,
    BlizzTextFieldComponent,
    FormsModule,
    RouterModule,
    DocCustomizerElementsControlsComponent,
    DocExpansionToggleComponent,
  ],
})
export class DocCustomizerStatesView implements OnInit {
  constructor(
    protected readonly service: DocCustomizerService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.service.detectChanges$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeDetector.markForCheck());
  }

  protected selectState(stateKey: string) {
    if (!stateKey) return;
    this.router.navigate([stateKey], { relativeTo: this.route });
  }

  protected onExpandArrowClick(
    expandableDirectiveRef: BlizzCdkExpandableDirective,
    event: MouseEvent,
  ) {
    if (expandableDirectiveRef.collapsed) return;
    expandableDirectiveRef.collapse();
    this.router.navigate(['./'], { relativeTo: this.route });
    event.stopPropagation();
  }

  protected readonly kebabToTitleCase = kebabToTitleCase;
}
