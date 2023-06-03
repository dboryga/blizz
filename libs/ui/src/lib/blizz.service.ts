import { inject, Injectable } from '@angular/core';
import { BLIZZ_CONFIG } from './config';
import { DOCUMENT } from '@angular/common';
import { flattenObject } from './utils';
import { BlizzComponentConfig, BlizzComponentsConfigs, BlizzTheme } from './models';
import { camelToKebabCase, Dictionary } from '@blizz/core';

function joinProperties<T>(obj: Dictionary<T>, transformer: (key: string, value: T) => string) {
  return Object.entries(obj)
    .map(([key, value]) => transformer(key, value))
    .join('\n');
}

@Injectable()
export class BlizzService {
  readonly config = inject(BLIZZ_CONFIG);
  protected readonly document = inject(DOCUMENT);

  static getCssString(obj: Dictionary<string>): string {
    return joinProperties(obj, (key, value) => `\t${camelToKebabCase(key)}: ${value};`);
  }

  static getCssVariables(config: Dictionary, prefix: string): string {
    return BlizzService.getCssString(flattenObject(config, '-', prefix));
  }
  static getCssRule(selector: string, props?: Dictionary, propsPrefix: string = ''): string {
    if (!props) return '';
    return `${selector} {\n${BlizzService.getCssVariables(props, propsPrefix)}\n}\n`;
  }

  static getThemeCssRule(theme: BlizzTheme): string {
    return BlizzService.getCssRule(':root', theme, '--bzz-theme_');
  }

  static getComponentCssRules(name: string, config: BlizzComponentConfig): string {
    const { variations, styles } = config;

    const general = BlizzService.getCssRule(`bzz-${name}`, styles, '--');
    const variationsRules = BlizzService.getComponentVariationsRules(name, variations);

    return general + variationsRules;
  }
  static getComponentVariationsRules(
    component: string,
    variations: BlizzComponentConfig['variations'],
  ) {
    if (!variations) return '';
    return joinProperties(variations, (variation: string, props) =>
      BlizzService.getCssRule(`bzz-${component}[variation="${variation}"]`, props.styles, '--'),
    );
  }

  static getComponentsCssRules(config: BlizzComponentsConfigs): string {
    return joinProperties(config, (name, props) => BlizzService.getComponentCssRules(name, props));
  }

  createGlobalCss() {
    const styleElement = this.document.createElement('style');

    const themeRule = BlizzService.getThemeCssRule(this.config.theme);
    const componentRules = BlizzService.getComponentsCssRules(this.config.components);

    const rules = `${themeRule}\n${componentRules}`;

    styleElement.appendChild(this.document.createTextNode(rules));

    const headElement = this.document.getElementsByTagName('head')[0];
    headElement.appendChild(styleElement);
  }
}
