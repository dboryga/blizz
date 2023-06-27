import { getVariationConfig, injectComponentConfig } from '../config';
import { ComponentKey } from './config.model';
import { ChangeDetectorRef, ElementRef } from '@angular/core';

export interface BlizzComponent {
  readonly componentKey: ComponentKey;
  readonly id: `bzz-${ComponentKey}-${number}`;

  readonly config: ReturnType<typeof injectComponentConfig>;

  variation?: string | null;

  get variationConfig(): ReturnType<typeof getVariationConfig>;

  readonly computedStyles: CSSStyleDeclaration;
  readonly hostElementRef: ElementRef<HTMLElement>;
  readonly changeDetector: ChangeDetectorRef;
}
