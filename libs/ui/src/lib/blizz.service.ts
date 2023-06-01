import { ElementRef, inject, Injectable } from '@angular/core';
import { BLIZZ_CONFIG } from './config';
import { DOCUMENT } from '@angular/common';
import { flattenObject } from './utils';
import { BlizzConfigValue } from './models';
import { camelToKebabCase } from '@blizz/core';

@Injectable()
export class BlizzService {
  readonly config = inject(BLIZZ_CONFIG);
  protected readonly document = inject(DOCUMENT);

  getCssVariables(config: BlizzConfigValue): string {
    const themeVariables = flattenObject(config.theme, ['_', '-'], '--bzz-theme');
    const compVariables = flattenObject(config.components, ['-', '_', '-'], '--bzz');
    const variables = { ...themeVariables, ...compVariables };

    return Object.entries(variables)
      .map(([key, value]) => `${camelToKebabCase(key)}: ${value};`)
      .join('\n');
  }

  createStyleElement(selector: string, variables: string): HTMLStyleElement {
    const css = `${selector} {\n${variables}\n}`;
    const style = this.document.createElement('style');
    style.appendChild(this.document.createTextNode(css));
    return style;
  }

  createGlobalCss() {
    const variables = this.getCssVariables(this.config);
    const styleElement = this.createStyleElement(':root', variables);
    const headElement = this.document.getElementsByTagName('head')[0];
    headElement.appendChild(styleElement);
  }

  createLocalCss(elementRef: ElementRef) {
    const variables = this.getCssVariables(this.config);
    const nativeElement: HTMLElement = elementRef.nativeElement;
    const currentStyle = nativeElement.getAttribute('style') ?? '';
    nativeElement.setAttribute('style', `${currentStyle}${variables}`);
  }
}
