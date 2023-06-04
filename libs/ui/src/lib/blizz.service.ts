import { inject, Injectable } from '@angular/core';
import { BLIZZ_CONFIG } from './config';
import { DOCUMENT } from '@angular/common';
import { flattenObject } from './utils';
import { BlizzConfigComponent, BlizzConfigComponentsDictionary, BlizzTheme } from './models';
import { camelToKebabCase } from '@blizz/core';
import { Dictionary, SafeDictionary } from 'ts-essentials';
import { map, mapKeys, merge } from 'lodash';

function joinProperties<_Value>(
  obj: Dictionary<_Value>,
  transformer: (key: keyof typeof obj, value: _Value) => string,
) {
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

  static getCssVariables<_Config extends SafeDictionary<string | _Config>>(
    config: _Config,
    prefix: string,
  ) {
    return BlizzService.getCssString(flattenObject(config, '-', prefix));
  }
  static getCssRule<_Props extends SafeDictionary<string | _Props>>(
    selector: string,
    props?: _Props,
    propsPrefix: string = '',
  ) {
    if (!props) return '';
    return `${selector} {\n${BlizzService.getCssVariables(props, propsPrefix)}\n}\n`;
  }

  static getThemeCssRule(theme: BlizzTheme): string {
    return BlizzService.getCssRule(':root', theme, '--bzz-theme_');
  }

  static getComponentCssRules(name: string, config: BlizzConfigComponent): string {
    const { variations, elements } = config;

    const general = BlizzService.getComponentElementsRules(`bzz-${name}`, elements);
    const variationsRules = BlizzService.getComponentVariationsRules(name, variations);

    return general + variationsRules;
  }

  static getComponentElementsRules(
    selector: string,
    elements: BlizzConfigComponent['elements'] | undefined,
  ) {
    if (!elements) return '';

    const propsWithElementPrefix = merge(
      {},
      ...map(elements, (props, element) =>
        element === 'base'
          ? props!.styles!
          : mapKeys(props!.styles!, (value, prop) => `${element}_${prop}`),
      ),
    );

    return BlizzService.getCssRule(selector, propsWithElementPrefix, '--');
  }
  static getComponentVariationsRules(
    component: string,
    variations: BlizzConfigComponent['variations'],
  ) {
    if (!variations) return '';
    return joinProperties(variations, (variation, { elements }) =>
      BlizzService.getComponentElementsRules(
        `bzz-${component}[variation="${variation}"]`,
        elements,
      ),
    );
  }

  static getComponentsCssRules(config: BlizzConfigComponentsDictionary) {
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
