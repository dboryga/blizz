import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getVariationConfig, injectComponentConfig } from '../../config';
import { BlizzComponent } from '../../models/component.model';
import { InputLabelPosition } from '../../models/props.model';

let instanceIdx = 0;

@Component({
  selector: 'bzz-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class BlizzInputComponent implements BlizzComponent {
  readonly componentName = 'input';
  readonly config = injectComponentConfig(this.componentName);

  @HostBinding('id')
  readonly id = `bzz-${this.componentName}-${instanceIdx++}` as const;

  @Input()
  @HostBinding('attr.variation')
  variation: string | null = null;

  get variationConfig() {
    return getVariationConfig(this.config, this.variation);
  }

  @Input()
  set labelPosition(value: InputLabelPosition | null) {
    this._labelPosition = value;
  }
  get labelPosition(): InputLabelPosition {
    return (
      this._labelPosition ?? this.variationConfig.elements.label?.styles.position ?? 'top-left'
    );
  }
  protected _labelPosition: InputLabelPosition | null = null;

  get inputRef() {
    return this.elementRef.nativeElement.getElementsByTagName('input')[0];
  }

  constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

  @HostListener('click')
  protected onClick() {
    this.inputRef.focus();
  }
}
