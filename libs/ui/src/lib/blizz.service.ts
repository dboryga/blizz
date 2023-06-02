import { ElementRef, inject, Injectable } from '@angular/core';
import { BLIZZ_CONFIG } from './config';
import { DOCUMENT } from '@angular/common';
import { flattenObject } from './utils';
import { BlizzComponentsConfig, BlizzConfigValue, BlizzTheme } from './models';
import { camelToKebabCase } from '@blizz/core';

@Injectable()
export class BlizzService {
  readonly config = inject(BLIZZ_CONFIG);
  protected readonly document = inject(DOCUMENT);

  static getCssString(object: { [k: string]: string }): string {
    return Object.entries(object)
      .map(([key, value]) => `${camelToKebabCase(key)}: ${value};`)
      .join(' ');
  }

  static getThemeCssVariable(colorName: string): string {
    return `--bzz-theme_${camelToKebabCase(colorName)}`;
  }

  static getThemeCssVariables(theme: BlizzTheme): string {
    return BlizzService.getCssString(flattenObject(theme, ['_', '-'], '--bzz-theme'));
  }

  static getComponentCssVariable(componentName: string, propertyName: string): string {
    return `--bzz-${componentName}_${camelToKebabCase(propertyName)}`;
  }

  static getComponentsCssVariables(componentsConfig: BlizzComponentsConfig): string {
    return BlizzService.getCssString(flattenObject(componentsConfig, ['-', '_', '-'], '--bzz'));
  }

  static getCssVariables(config: BlizzConfigValue): string {
    const themeVariables = BlizzService.getThemeCssVariables(config.theme);
    const compVariables = BlizzService.getComponentsCssVariables(config.components);
    return `${themeVariables} ${compVariables}`;
  }

  static createStyleElement(
    document: Document,
    selector: string,
    variables: string,
  ): HTMLStyleElement {
    const css = `${selector} {\n${variables}\n}`;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    return style;
  }

  static createLocalCss(
    elementRef: ElementRef,
    config: Readonly<BlizzConfigValue>,
    preserveCurrentStyle: boolean = true,
  ) {
    const variables = BlizzService.getCssVariables(config);
    const nativeElement: HTMLElement = elementRef.nativeElement;
    const currentStyle = preserveCurrentStyle ? nativeElement.getAttribute('style') ?? '' : '';
    nativeElement.setAttribute('style', `${currentStyle}${variables}`);
  }

  createStyleElement(selector: string, variables: string): HTMLStyleElement {
    return BlizzService.createStyleElement(this.document, selector, variables);
  }

  createGlobalCss() {
    const variables = BlizzService.getCssVariables(this.config);
    const styleElement = this.createStyleElement(':root', variables);
    const headElement = this.document.getElementsByTagName('head')[0];
    headElement.appendChild(styleElement);
  }

  createLocalCss(elementRef: ElementRef, preserveCurrentStyle: boolean = true) {
    BlizzService.createLocalCss(elementRef, this.config, preserveCurrentStyle);
  }
}
