import { inject, Injectable } from '@angular/core';
import { BLIZZ_CONFIG } from './config';
import { DOCUMENT } from '@angular/common';
import { flattenObject } from './utils';
import {
  ANY_NATIVE_STATE,
  BLIZZ_COLOR_SHADE_KEYS,
  BlizzColorShade,
  BlizzConfigComponent,
  BlizzConfigComponentsDictionary,
  BlizzTheme,
} from './models';
import { camelToKebabCase } from '@blizz/core';
import { DeepPartial, Dictionary, SafeDictionary } from 'ts-essentials';
import { map, mapKeys, mapValues, merge } from 'lodash';

function joinProperties<_Value>(
  obj: Record<string, _Value>,
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

  static getCssVariables<_Config>(config: _Config, prefix: string) {
    return BlizzService.getCssString(flattenObject(config, '-', prefix));
  }
  static getCssRule<_Props>(selector: string, props?: _Props, propsPrefix: string = '') {
    if (!props) return '';
    return `${selector} {\n${BlizzService.getCssVariables(props, propsPrefix)}\n}\n`;
  }

  static isColorShade(
    colorProp: BlizzColorShade | SafeDictionary<string> | string,
  ): colorProp is BlizzColorShade {
    if (typeof colorProp === 'string') return false;
    return BLIZZ_COLOR_SHADE_KEYS.every((key) => key in colorProp);
  }

  static createDefaultColorVariable(
    colorProp: BlizzColorShade | SafeDictionary<string> | string,
    key: string,
  ) {
    if (!BlizzService.isColorShade(colorProp)) return colorProp;
    const defaultValue = colorProp.default ?? 500;
    delete colorProp.default;
    return {
      ...colorProp,
      '': `var(--bzz-theme_${key}-${defaultValue})`,
    };
  }

  static getThemeCssRule(theme: BlizzTheme): string {
    return BlizzService.getCssRule(
      ':root',
      mapValues(theme, BlizzService.createDefaultColorVariable),
      '--bzz-theme_',
    );
  }

  static getComponentCssRules(name: string, config: BlizzConfigComponent): string {
    const selector = `bzz-${name}`;
    const base = BlizzService.getComponentElementsCssRules(selector, config.elements);
    const states = BlizzService.getComponentStatesCssRules(selector, config.states);
    const variations = BlizzService.getComponentVariationsCssRules(selector, config.variations);

    return base + states + variations;
  }

  static getComponentElementsCssRules(
    selector: string,
    elements: DeepPartial<BlizzConfigComponent['elements']> | undefined,
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

  static getComponentStatesCssRules(
    selector: string,
    states: BlizzConfigComponent['states'] | undefined,
  ) {
    if (!states) return '';
    return joinProperties(states, (state, elements) => {
      const isNative = (Object.values(ANY_NATIVE_STATE) as string[]).includes(state);
      const _selector = isNative ? `${selector}:${state}` : `${selector}[state-${state}=true]`;
      return BlizzService.getComponentElementsCssRules(_selector, elements);
    });
  }

  static getComponentVariationsCssRules(
    selector: string,
    variations: BlizzConfigComponent['variations'] | undefined,
  ) {
    if (!variations) return '';
    return joinProperties(variations, (variation, config) => {
      const _selector = `${selector}[variation="${variation}"]`;
      const base = BlizzService.getComponentElementsCssRules(_selector, config.elements);
      const states = BlizzService.getComponentStatesCssRules(_selector, config.states);
      return base + states;
    });
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
