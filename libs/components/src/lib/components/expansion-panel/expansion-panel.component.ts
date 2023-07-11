import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { BlizzComponent } from '../../models';
import { getVariationConfig, injectComponentConfig } from '../../config';
import { CommonModule } from '@angular/common';
import { BlizzIconComponent } from '../icon';
import { ExpansionPanelService } from './expansion-panel.service';
import { BlizzExpansionPanelTriggerComponent } from './components/expansion-panel-trigger.component';
import { BlizzExpansionPanelContentComponent } from './components/expansion-panel-content.component';

@Component({
  selector: 'bzz-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [BlizzIconComponent, CommonModule],
  providers: [ExpansionPanelService],
})
export class BlizzExpansionPanelComponent implements BlizzComponent {
  static instanceIdx = 0;
  readonly componentKey = 'expansionPanel';
  readonly config = injectComponentConfig(this.componentKey);
  readonly hostElementRef = inject(ElementRef<HTMLElement>);
  readonly changeDetector = inject(ChangeDetectorRef);
  readonly service = inject(ExpansionPanelService);
  readonly computedStyles = getComputedStyle(this.hostElementRef.nativeElement);

  @Input()
  @HostBinding('id')
  id = `bzz-${this.componentKey}-${BlizzExpansionPanelComponent.instanceIdx++}`;

  @Input()
  @HostBinding('attr.variation')
  set variation(v) {
    this._variation = v;
    this.changeDetector.markForCheck();
  }
  get variation() {
    return this._variation;
  }
  private _variation?: string | null;

  get variationConfig() {
    return getVariationConfig(this.config, this.variation);
  }

  @ContentChild(BlizzExpansionPanelTriggerComponent) private set _triggerRef(
    ref: BlizzExpansionPanelTriggerComponent,
  ) {
    this.service.triggerRef = ref;
  }
  @ContentChild(BlizzExpansionPanelContentComponent) private set _contentRef(
    ref: BlizzExpansionPanelContentComponent,
  ) {
    this.service.contentRef = ref;
  }

  @Input()
  set group(v) {
    this.service.group = v;
  }
  get group() {
    return this.service.group;
  }

  @Input()
  set expandSingle(v) {
    this.service.expandSingle = v;
  }
  get expandSingle() {
    return this.service.expandSingle;
  }

  @Input()
  @HostBinding('attr.state-expanded')
  set expanded(v: boolean) {
    this.service.expanded = v;
  }
  get expanded(): boolean {
    return this.service.expanded;
  }

  @HostBinding('attr.state-triggerHover')
  private get stateTriggerHover() {
    return this.service.triggerRef?.hovering ?? false;
  }

  get collapsed(): boolean {
    return this.service.collapsed;
  }

  toggle() {
    this.service.toggle();
  }

  expand() {
    this.service.expand();
  }

  collapse() {
    this.service.collapse();
  }
}
