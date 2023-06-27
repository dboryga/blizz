import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { canOptimizeBorder } from '../../utils';
import { BlizzComponent } from '../../models/component.model';
import { getVariationConfig, injectComponentConfig } from '../../config';

@Component({
  selector: 'bzz-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class BlizzChipComponent implements BlizzComponent {
  static instanceIdx = 0;
  readonly componentKey = 'input';
  readonly config = injectComponentConfig(this.componentKey);
  readonly computedStyles = getComputedStyle(this.hostElementRef.nativeElement);

  @HostBinding('id')
  readonly id = `bzz-${this.componentKey}-${BlizzChipComponent.instanceIdx++}` as const;

  @Input()
  @HostBinding('attr.variation')
  variation?: string | null;

  get variationConfig() {
    return getVariationConfig(this.config, this.variation);
  }

  constructor(
    public readonly hostElementRef: ElementRef<HTMLElement>,
    public readonly changeDetector: ChangeDetectorRef,
  ) {}

  @Input()
  selectable = true;

  @HostBinding('attr.state-selectable')
  get hostStateSelectable() {
    return this.selectable && !this.disabled;
  }

  @HostBinding('attr.tabIndex')
  get hostTabIndex() {
    return this.selectable ? 0 : -1;
  }

  @Input()
  set selected(v: boolean) {
    if (!this.selectable || this.disabled || v === this._selected) return;
    this._selected = v;
    this.selectionChange.next(v);
    v ? this.selectionSelect.next() : this.selectionDeselect.next();
    this.changeDetector.markForCheck();
  }
  get selected(): boolean {
    return this.selectable ? this._selected : false;
  }
  private _selected = false;

  @Output() selectionSelect = new EventEmitter<void>();
  @Output() selectionDeselect = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<boolean>();

  @Input()
  @HostBinding('attr.state-disabled')
  @HostBinding('attr.aria-disabled')
  set disabled(v: boolean) {
    if (v === this._disabled) return;
    this._disabled = v;
    this.disabledChange.next(v);
    this.changeDetector.markForCheck();
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @Output() disabledChange = new EventEmitter<boolean>();

  @HostBinding('attr.state-selected')
  @HostBinding('attr.aria-selected')
  get hostSelected() {
    return this.selectable ? this.selected : undefined;
  }

  @HostBinding('attr.role')
  get hostRole() {
    return this.selectable ? 'button' : undefined;
  }

  @HostBinding('class.--optimized-border')
  get optimizedBorder() {
    return canOptimizeBorder(this.computedStyles, '--border-width', '--border-style');
  }

  @HostListener('click')
  toggle() {
    if (this.disabled) return;
    this.selected = !this.selected;
  }

  select() {
    if (this.disabled) return;
    this.selected = true;
  }

  deselect() {
    if (this.disabled) return;
    this.selected = false;
  }
}
