import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  NgModule,
  OnDestroy,
  Optional,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyofBase } from 'ts-essentials/dist/key-of-base';

@Directive({
  selector: '[bzzExpandable]',
  exportAs: 'bzzExpandable',
})
export class BlizzExpandableDirective implements OnDestroy {
  static instanceIdx = 0;
  readonly instanceIdx = BlizzExpandableDirective.instanceIdx++;

  @HostBinding('attr.id')
  get id(): string {
    return this.elementRef.nativeElement.id || `bzz-expandable-${this.instanceIdx}`;
  }

  triggerRef?: BlizzExpandableTriggerDirective;

  @Input('bzzExpandableExpanded')
  set expanded(v: boolean) {
    if (v === this._expanded) return;
    this._expanded = v;
    this.bzzExpandableChange.emit(v);
    if (v === true) this.bzzExpandableExpanded.emit();
    if (v === false) this.bzzExpandableCollapsed.emit();
    this.triggerRef?.changeDetector.markForCheck();
  }
  get expanded(): boolean {
    return this._expanded;
  }
  protected _expanded = false;

  @HostBinding('attr.aria-hidden')
  get collapsed(): boolean {
    return !this._expanded;
  }

  @HostBinding('class')
  private get hostClass(): string[] {
    return this.expanded
      ? ['bzz-expandable', 'bzz-expandable--expanded']
      : ['bzz-expandable', 'bzz-expandable--collapsed'];
  }

  @HostBinding('style.display')
  private get hostDisplay(): string | undefined {
    return this.expanded ? undefined : 'none';
  }

  @HostBinding('style.height')
  @HostBinding('style.paddingTop')
  @HostBinding('style.paddingBottom')
  private get hostStyle(): string | undefined {
    return this.expanded ? undefined : '0';
  }

  @HostBinding('style.overflow')
  private get hostOverflow(): string {
    return 'hidden';
  }

  @HostBinding('attr.aria-labeledby')
  private get hostAriaLabeledby(): string | undefined {
    return this.triggerRef?.id;
  }

  @Output() bzzExpandableExpanded = new EventEmitter<void>();
  @Output() bzzExpandableCollapsed = new EventEmitter<void>();
  @Output() bzzExpandableChange = new EventEmitter<boolean>();

  @Input('bzzExpandableGroup') set groupId(v: KeyofBase | null) {
    if (v === this._groupId) return;
    v ? this.groupService.register(v, this) : this.groupService.delete(this);
    this._groupId = v;
  }
  get groupId(): KeyofBase | null {
    return this._groupId;
  }
  protected _groupId: KeyofBase | null = null;

  constructor(
    protected readonly elementRef: ElementRef<HTMLElement>,
    @Optional() protected readonly groupService: BlizzExpandableGroupService,
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

@Directive({
  selector: '[bzzExpandableToggle]',
})
export class BlizzExpandableTriggerDirective {
  @HostBinding('attr.id')
  get id(): string {
    return this.elementRef.nativeElement.id || `${this.expandableDirective.id}-toggle`;
  }

  @Input('bzzExpandableToggle')
  set expandableDirective(v: BlizzExpandableDirective) {
    if (v === this._expandableDirective) return;
    this._expandableDirective = v;
    v.triggerRef = this;
  }
  get expandableDirective(): BlizzExpandableDirective {
    return this._expandableDirective;
  }
  private _expandableDirective!: BlizzExpandableDirective;

  @Input('bzzExpandableExpandSingle')
  @HostBinding('class.bzz-expandable-toggle--single')
  expandSingle = false;

  @HostBinding('class')
  private get hostClass(): string[] {
    return this._expandableDirective.expanded
      ? ['bzz-expandable-toggle', 'bzz-expandable-toggle--expanded']
      : ['bzz-expandable-toggle', 'bzz-expandable-toggle--collapsed'];
  }

  @HostBinding('attr.aria-expanded')
  private get hostAriaExpanded(): boolean {
    return this._expandableDirective.expanded;
  }

  @Input('bzzExpandableClosable')
  set closable(v: boolean) {
    if (v === this._closable) return;
    this._closable = v;
  }
  get closable(): boolean {
    return this._closable;
  }
  private _closable = true;

  constructor(
    readonly elementRef: ElementRef<HTMLElement>,
    readonly changeDetector: ChangeDetectorRef,
    @Optional() protected readonly groupService: BlizzExpandableGroupService,
  ) {}

  @HostListener('click')
  protected onClick() {
    if (this.expandSingle) {
      this.expandableDirective.expanded && this.closable
        ? this.expandableDirective.collapse()
        : this.groupService.expandSingle(this.expandableDirective);
      return;
    }
    this._expandableDirective.toggle();
  }
}

@Injectable({ providedIn: 'root' })
export class BlizzExpandableGroupService {
  readonly groups = new Map<KeyofBase, Map<string, BlizzExpandableDirective>>();

  register(groupId: KeyofBase, directive: BlizzExpandableDirective) {
    if (this.groups.has(groupId)) {
      this.groups.get(groupId)!.set(directive.id, directive);
      return;
    }
    this.groups.set(groupId, new Map([[directive.id, directive]]));
  }

  delete(directive: BlizzExpandableDirective) {
    if (directive.groupId) {
      const group = this.groups.get(directive.groupId);
      group?.delete(directive.id);
      if (![...(group?.values() ?? [])]?.length) this.groups.delete(directive.groupId);
    }
  }

  clearGroup(groupId: KeyofBase) {
    this.groups.get(groupId)?.clear();
  }

  expandSingle(directive: BlizzExpandableDirective) {
    if (!directive.groupId) return;
    this.groups.get(directive.groupId)?.forEach((_directive) => {
      if (directive.id === _directive.id) return _directive.expand();
      _directive.collapse();
    });
  }

  expandAll(groupId: KeyofBase) {
    this.groups.get(groupId)?.forEach((directive) => directive.expand());
  }

  collapseAll(groupId: KeyofBase) {
    this.groups.get(groupId)?.forEach((directive) => directive.collapse());
  }
}

@NgModule({
  declarations: [BlizzExpandableDirective, BlizzExpandableTriggerDirective],
  exports: [BlizzExpandableDirective, BlizzExpandableTriggerDirective],
  imports: [CommonModule],
})
export class BlizzExpandableModule {}
