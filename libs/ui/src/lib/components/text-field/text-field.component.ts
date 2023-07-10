import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { getVariationConfig, injectComponentConfig } from '../../config';
import { effectiveBackgroundColor } from '@blizz/core';
import { canOptimizeBorder } from '../../utils';
import { BlizzComponent } from '../../models/component.model';
import { BlizzService } from '../../blizz.service';
import { Props } from '../../models';
import { BlizzSelectComponent } from '../select';

@Component({
  selector: 'bzz-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class BlizzTextFieldComponent implements BlizzComponent, AfterContentChecked {
  static instanceIdx = 0;
  readonly componentKey = 'textField';
  readonly config = injectComponentConfig(this.componentKey);
  readonly computedStyles = getComputedStyle(this.hostElementRef.nativeElement);

  readonly document = inject(DOCUMENT);

  @Input()
  @HostBinding('id')
  id = `bzz-${this.componentKey}-${BlizzTextFieldComponent.instanceIdx++}`;

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

  @HostBinding('attr.state-empty')
  get empty() {
    return !this.inputElement?.value?.length;
  }

  @HostBinding('attr.state-required')
  get required() {
    return !this.inputElement?.required;
  }

  @HostBinding('class.--no-input-element')
  get disableTransitions() {
    return !this.inputElement || !this.labelElement;
  }

  @HostBinding('attr.state-disabled')
  get disabled(): boolean {
    return !!this.inputElement?.disabled;
  }

  @Input()
  set labelPosition(value: Props.InputLabelPosition | null) {
    this._labelPosition = value;
  }
  get labelPosition(): Props.InputLabelPosition {
    if (this._labelPosition) return this._labelPosition;
    return (
      (this.computedStyles.getPropertyValue(
        BlizzService.getCssVariable(this.componentKey, 'label', 'position'),
      ) as Props.InputLabelPosition) ?? 'top-left'
    );
  }
  protected _labelPosition: Props.InputLabelPosition | null = null;

  @Input()
  @HostBinding('class.--label-floating-always')
  labelFloatingAlways = false;

  @HostBinding('attr.state-labelFloating')
  get labelFloating(): boolean {
    return (
      this.labelPosition === 'floating' && (this.labelFloatingAlways || !this.empty || this.focused)
    );
  }

  @HostBinding('style.--floating-label-color')
  get floatingLabelBgWhenTransparent() {
    if (this.variation === this._memo_floatingLabelBgWhenTransparent?.variation) {
      return this._memo_floatingLabelBgWhenTransparent?.value;
    }
    if (this.labelPosition !== 'floating') return;
    if (
      this.computedStyles.getPropertyValue(
        BlizzService.getCssVariable(this.componentKey, 'field', 'bg-color'),
      ) !== 'transparent'
    )
      return;

    return effectiveBackgroundColor(this.hostElementRef.nativeElement);
  }
  private _memo_floatingLabelBgWhenTransparent?: { value: string; variation: string };

  @HostBinding('class.--optimized-border')
  get optimizedBorder() {
    return canOptimizeBorder(
      this.computedStyles,
      BlizzService.getCssVariable(this.componentKey, '', 'border-width'),
      BlizzService.getCssVariable(this.componentKey, '', 'border-style'),
    );
  }

  @HostBinding('class.--optimized-field-border')
  get optimizedFieldBorder() {
    return canOptimizeBorder(
      this.computedStyles,
      BlizzService.getCssVariable(this.componentKey, 'field', 'border-width'),
      BlizzService.getCssVariable(this.componentKey, 'field', 'border-style'),
    );
  }

  @HostBinding('class')
  get labelPositionClasses() {
    const split = this.labelPosition.split('-');
    const main = split[0];
    const sec = split[1];
    if (!main) return 'top-left';
    return [`--label-${main}`, ...(sec ? [`--label-secondary-${sec}`] : [])];
  }

  protected set inputElement(v: HTMLInputElement | HTMLSelectElement | null) {
    if (v === this._inputElement) return;
    this._inputElement = v;
    v?.classList.add('bzz-text-field__control');
    this._inputElementAbortController?.abort();
    if (!v) return;
    this._inputElementAbortController = new AbortController();
    const { signal } = this._inputElementAbortController;
    v.addEventListener('focus', () => (this.focused = true), { signal });
    v.addEventListener('blur', () => (this.focused = false), { signal });
    if (!v.id) {
      v.setAttribute('id', `${this.id}-input`);
      this.changeDetector.markForCheck();
    }
  }
  public get inputElement(): HTMLInputElement | HTMLSelectElement | null {
    return this._inputElement ?? null;
  }
  protected _inputElement?: HTMLInputElement | HTMLSelectElement | null;
  protected _inputElementAbortController?: AbortController;

  @ContentChild(BlizzSelectComponent) selectComponentRef!: BlizzSelectComponent;

  protected set labelElement(v: HTMLLabelElement | null) {
    if (v === this._inputElement) return;
    this._labelElement = v;
    if (!v?.htmlFor && this.inputElement) {
      v?.setAttribute('for', this.inputElement.id);
      this.changeDetector.markForCheck();
    }
  }
  public get labelElement(): HTMLLabelElement | null {
    return this._labelElement ?? null;
  }
  protected _labelElement?: HTMLLabelElement | null;

  @HostBinding('attr.state-focus')
  private set focused(v: boolean) {
    if (v === this._focused) return;
    this._focused = v;
    this.inputFocusChange.next(v);
    v ? this.inputFocus.next() : this.inputBlur.next();
    this.changeDetector.markForCheck();
  }
  get focused(): boolean {
    return this._focused;
  }
  private _focused = false;

  @Output() inputFocus = new EventEmitter<void>();
  @Output() inputBlur = new EventEmitter<void>();
  @Output() inputFocusChange = new EventEmitter<boolean>();

  ngAfterContentChecked() {
    this.getReferences();
  }

  getReferences() {
    this.inputElement = this.hostElementRef.nativeElement.querySelector('input, select');
    this.labelElement = this.hostElementRef.nativeElement.querySelector('label');
  }

  @HostListener('click')
  focus() {
    this.inputElement?.focus();
  }

  blur() {
    this.inputElement?.blur();
  }
}
