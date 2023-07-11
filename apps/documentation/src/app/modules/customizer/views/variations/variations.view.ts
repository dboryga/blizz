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
import { DocIconComponent } from '../../../../shared';
import {
  BlizzCdkExpandableDirective,
  BlizzCdkExpandableModule,
  camelToKebabCase,
  camelToTitleCase,
} from '@blizz-ui/core';
import { BlizzTextFieldComponent } from '@blizz-ui/components';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { keys } from 'lodash';
import { debounceTime, filter, Subject } from 'rxjs';
import { DocCustomizerElementsControlsComponent } from '../../components/elements-controls/elements-controls.component';
import { DocExpansionToggleComponent } from '../../../../shared/components/expansion-toggle/expansion-toggle.component';

@UntilDestroy()
@Component({
  selector: 'doc-customizer-variations',
  templateUrl: './variations.view.html',
  styleUrls: ['./variations.view.scss'],
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
export class DocCustomizerVariationsView implements OnInit {
  readonly renameVariation$ = new Subject<{
    key: string;
    newKey: string;
  }>();

  statesInitiallyExpanded = false;

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

    this.renameVariation$
      .pipe(
        untilDestroyed(this),
        debounceTime(300),
        filter(({ key, newKey }) => key !== newKey),
      )
      .subscribe(({ key, newKey }) => this._renameVariation(key, newKey));

    this.statesInitiallyExpanded = !!this.service.stateKey?.length;
  }

  protected addVariation(inputRef: HTMLInputElement) {
    const key = inputRef.value;
    if (!key?.length || keys(this.service.sidebarData?.variations).includes(key)) return;
    this.service.createVariation(key);
    this.selectVariation(key);
    inputRef.value = '';
  }

  protected removeVariation(key: string) {
    this.service.removeVariation(key);
  }

  protected selectVariation(variationKey: string) {
    if (!variationKey) return;
    this.router.navigate([variationKey], { relativeTo: this.route });
  }

  protected selectState(stateKey: string) {
    if (!stateKey) return;
    this.router.navigate([this.service.variationKey, stateKey], { relativeTo: this.route });
  }

  protected variationArrowClick(
    expandableDirectiveRef: BlizzCdkExpandableDirective,
    event: MouseEvent,
  ) {
    if (expandableDirectiveRef.collapsed) return;
    event.stopPropagation();
    expandableDirectiveRef.collapse();
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  private _renameVariation(key: string, newKey: string) {
    this.service.renameVariation(key, newKey);
    this.selectVariation(newKey);
  }

  protected readonly camelToKebabCase = camelToKebabCase;
  protected readonly camelToTitleCase = camelToTitleCase;
}
