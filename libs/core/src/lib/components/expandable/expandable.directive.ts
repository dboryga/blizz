import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { KeyofBase } from 'ts-essentials/dist/key-of-base';
import { BlizzCdkExpandableTriggerDirective } from './expandable-trigger.directive';
import { BlizzExpandableGroupService } from './expandable-group.service';

@Directive({
  selector: '[bzzExpandable]',
  exportAs: 'bzzExpandable',
  standalone: true,
})
export class BlizzCdkExpandableDirective implements OnDestroy {
  static instanceIdx = 0;
  readonly instanceIdx = BlizzCdkExpandableDirective.instanceIdx++;

  @HostBinding('attr.id')
  get id(): string {
    return this.elementRef.nativeElement.id || `bzz-expandable-${this.instanceIdx}`;
  }

  triggerRef?: BlizzCdkExpandableTriggerDirective;

  @Input('bzzExpandableExpanded')
  @HostBinding('attr.expanded')
  set expanded(v: boolean) {
    if (v === this._expanded) return;
    this._expanded = v;
    this.afterToggle.emit(v);
    if (v === true) this.afterExpand.emit();
    if (v === false) this.afterCollapse.emit();
    this.changeDetector.detectChanges();
    this.triggerRef?.changeDetector.detectChanges();
  }
  get expanded(): boolean {
    return this._expanded;
  }
  protected _expanded = false;

  @HostBinding('attr.aria-hidden')
  get collapsed(): boolean {
    return !this._expanded;
  }

  @HostBinding('style.height')
  @HostBinding('style.paddingTop')
  @HostBinding('style.paddingBottom')
  get hostSize() {
    return this.expanded ? undefined : '0 !important';
  }

  @HostBinding('style.visibility')
  @HostBinding('style.overflow')
  get hostVisibility() {
    return this.expanded ? undefined : 'hidden';
  }

  @HostBinding('attr.aria-labeledby')
  private get hostAriaLabeledby(): string | undefined {
    return this.triggerRef?.id;
  }

  @Output('bzzExpandableAfterExpand') protected readonly afterExpand = new EventEmitter<void>();
  @Output('bzzExpandableAfterCollapse') protected readonly afterCollapse = new EventEmitter<void>();
  @Output('bzzExpandableAfterToggle') protected readonly afterToggle = new EventEmitter<boolean>();

  @Input('bzzExpandableGroup') set group(v: KeyofBase | null) {
    if (v === this._group) return;
    v ? this.groupService.register(v, this) : this.groupService.delete(this);
    this._group = v;
  }
  get group(): KeyofBase | null {
    return this._group;
  }
  protected _group: KeyofBase | null = null;

  constructor(
    readonly elementRef: ElementRef<HTMLElement>,
    readonly groupService: BlizzExpandableGroupService,
    readonly changeDetector: ChangeDetectorRef,
  ) {}

  toggle() {
    this.expanded = !this.expanded;
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  ngOnDestroy() {
    this.groupService.delete(this);
  }
}
