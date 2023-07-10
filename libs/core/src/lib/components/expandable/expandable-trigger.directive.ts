import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { BlizzCdkExpandableDirective } from './expandable.directive';
import { BlizzExpandableGroupService } from './expandable-group.service';

@Directive({
  selector: '[bzzExpandableTrigger]',
  exportAs: 'bzzExpandableTrigger',
  standalone: true,
})
export class BlizzCdkExpandableTriggerDirective {
  @HostBinding('attr.id')
  get id(): string {
    return this.elementRef.nativeElement.id || `${this.expandableDirective?.id}-trigger`;
  }

  @Input('bzzExpandableTrigger')
  set expandableDirective(v: BlizzCdkExpandableDirective | undefined) {
    if (v === this._expandableDirective) return;
    this._expandableDirective = v;
    if (v) v.triggerRef = this;
  }
  get expandableDirective(): BlizzCdkExpandableDirective | undefined {
    return this._expandableDirective;
  }
  private _expandableDirective?: BlizzCdkExpandableDirective;

  @Input('bzzExpandableTriggerCanExpand') canExpand = true;
  @Input('bzzExpandableTriggerCanCollapse') canCollapse = true;

  @Input('bzzExpandableTriggerExpandSingle') expandSingle = false;

  @HostBinding('attr.aria-expanded')
  private get hostAriaExpanded(): boolean {
    return this._expandableDirective?.expanded ?? false;
  }

  constructor(
    readonly elementRef: ElementRef<HTMLElement>,
    readonly changeDetector: ChangeDetectorRef,
    readonly groupService: BlizzExpandableGroupService,
  ) {}

  @HostListener('click')
  protected onClick() {
    if (!this.expandableDirective) return;
    if (this.expandableDirective.expanded && this.canCollapse) {
      this.expandableDirective.collapse();
      return;
    }

    if (this.expandableDirective.collapsed && this.canExpand) {
      this.expandSingle
        ? this.groupService.expandSingle(this.expandableDirective)
        : this.expandableDirective.expand();
      return;
    }
  }
}
