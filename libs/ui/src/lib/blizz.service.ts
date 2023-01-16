import { inject, Injectable } from '@angular/core';
import { BLIZZ_CONFIG } from './config';
import { DOCUMENT } from '@angular/common';
import { camelToKebabCase, flattenObject } from './utils';

@Injectable({ providedIn: 'root' })
export class BlizzService {
  protected readonly config = inject(BLIZZ_CONFIG);
  protected readonly document = inject(DOCUMENT);

  init() {
    this.createCssVariables();
  }

  protected createCssVariables() {
    const { theme, components } = this.config;

    const themeVariables = flattenObject(theme, ['_', '-'], '--bzz-theme');
    const compVariables = flattenObject(components, ['-', '_', '-'], '--bzz');

    const variables = { ...themeVariables, ...compVariables };
    console.log(variables);

    const variablesString = Object.entries(variables)
      .map(([key, value]) => `${camelToKebabCase(key)}: ${value};`)
      .join('\n');

    const css = `:root {\n${variablesString}\n}`;
    const head = this.document.getElementsByTagName('head')[0];
    const style = this.document.createElement('style');
    style.appendChild(this.document.createTextNode(css));
    head.appendChild(style);
  }
}
