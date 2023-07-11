import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding, inject,
  Input,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { BlizzComponent } from '../../models';
import { getVariationConfig, injectComponentConfig } from '../../config';
import { CommonModule } from '@angular/common';
import { BlizzExpansionPanelComponent } from '../expansion-panel';
import { BlizzExpandableGroupService } from '@blizz-ui/core';

@Component({
  selector: 'bzz-accordion',
  template: '<ng-content select="bzz-expansion-panel"></ng-content>',
  styleUrls: ['./accordion.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
})
export class BlizzAccordionComponent implements BlizzComponent, AfterContentInit {
  static instanceIdx = 0;
  readonly componentKey = 'accordion';
  readonly config = injectComponentConfig(this.componentKey);
  readonly hostElementRef = inject(ElementRef<HTMLElement>);
  readonly changeDetector = inject(ChangeDetectorRef);
  readonly expandableGroupService = inject(BlizzExpandableGroupService);
  readonly computedStyles = getComputedStyle(this.hostElementRef.nativeElement);

  @Input()
  @HostBinding('id')
  id = `bzz-${this.componentKey}-${BlizzAccordionComponent.instanceIdx++}`;

  @Input()
  @HostBinding('attr.variation')
  variation?: string | null;

  get variationConfig() {
    return getVariationConfig(this.config, this.variation);
  }

  @ContentChildren(BlizzExpansionPanelComponent)
  panelComponentsRefs!: QueryList<BlizzExpansionPanelComponent>;

  @Input()
  set group(v) {
    this._group = v;
    this.setupPanels();
  }
  get group() {
    return this._group ?? this.id;
  }
  private _group?: string;

  @Input()
  set multi(v) {
    if (v === this._multi) return;
    this._multi = v;
    this.setupPanels();
  }
  get multi() {
    return this._multi;
  }
  private _multi = false;

  ngAfterContentInit() {
    this.setupPanels();
  }

  setupPanels() {
    this.panelComponentsRefs?.forEach((panel) => {
      panel.group = this.group;
      panel.expandSingle = !this.multi;
      panel.variation = this.config.elements.expansionPanel?.styles.variation;
    });
  }

  expandAll() {
    this.expandableGroupService.expandAll(this.group);
  }

  collapseAll() {
    this.expandableGroupService.collapseAll(this.group);
  }
}
