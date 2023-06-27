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
import { BlizzExpandableDirective, BlizzExpandableModule, kebabToTitleCase } from '@blizz/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DocIconComponent } from '../../../../shared';
import { BlizzInputComponent } from '@blizz/ui';
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
    BlizzExpandableModule,
    BlizzInputComponent,
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
    expandableDirectiveRef: BlizzExpandableDirective,
    event: MouseEvent,
  ) {
    if (expandableDirectiveRef.collapsed) return;
    expandableDirectiveRef.collapse();
    this.router.navigate(['./'], { relativeTo: this.route });
    event.stopPropagation();
  }

  protected readonly kebabToTitleCase = kebabToTitleCase;
}
