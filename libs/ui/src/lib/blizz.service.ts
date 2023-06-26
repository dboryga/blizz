import { inject, Injectable } from '@angular/core';
import { BLIZZ_CONFIG, BLIZZ_SERVICE_OPTIONS } from './config';
import { DOCUMENT } from '@angular/common';
import { flattenObject } from './utils';
import {
  AnyNativeState,
  BlizzColorShade,
  BlizzColorShadeKey,
  BlizzConfigComponent,
  BlizzConfigComponentsDictionary,
  BlizzTheme,
} from './models';
import { camelToKebabCase } from '@blizz/core';
import { DeepPartial, Dictionary, SafeDictionary } from 'ts-essentials';
import { map, mapKeys, mapValues, merge } from 'lodash';

export interface BlizzServiceOptions {
  ancestorSelector?: string;
  selectorPrefix?: string;
  selectorSuffix?: string;
  customStateSelectors?: (stateKey: string) => string[];
  customVariationSelector?: (variationKey: string) => string;
}

function joinProperties<_Value>(
  obj: Record<string, _Value>,
  transformer: (key: keyof typeof obj, value: _Value) => string,
) {
  if (!obj) return '';
  return Object.entries(obj)
    .map(([key, value]) => transformer(key, value))
    .join('\n');
}

@Injectable()
export class BlizzService {
  readonly config = inject(BLIZZ_CONFIG);
  readonly options = inject(BLIZZ_SERVICE_OPTIONS);
  protected readonly document = inject(DOCUMENT);

  static getCssString(obj: Dictionary<string>): string {
    if (!obj) return '';
    return joinProperties(obj, (key, value) => `\t${camelToKebabCase(key)}: ${value};`);
  }

  static getCssVariables<_Config>(config: _Config, prefix: string = '--') {
    if (!config) return '';
    return BlizzService.getCssString(flattenObject(config, '-', prefix));
  }
  static getCssRule<_Props>(selector: string, props?: _Props, propsPrefix: string = '--') {
    if (!props) return '';
    return `${selector} {\n${BlizzService.getCssVariables(props, propsPrefix)}\n}\n`;
  }

  static isColorShade(
    colorProp: BlizzColorShade | SafeDictionary<string> | string,
  ): colorProp is BlizzColorShade {
    if (typeof colorProp === 'string') return false;
    return BlizzColorShadeKey.every((key) => key in colorProp);
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

  static getThemeCssRule(theme: BlizzTheme, opts?: BlizzServiceOptions): string {
    return BlizzService.getCssRule(
      opts?.ancestorSelector || ':root',
      mapValues(theme, BlizzService.createDefaultColorVariable),
      '--bzz-theme_',
    );
  }

  static getComponentCssRules(
    name: string,
    config: BlizzConfigComponent,
    opts?: BlizzServiceOptions,
  ): string {
    const selector = `bzz-${name}`;
    const base = BlizzService.getComponentElementsCssRules(selector, config.elements, opts);
    const states = BlizzService.getComponentStatesCssRules(selector, config.states, opts);
    const variations = BlizzService.getComponentVariationsCssRules(
      selector,
      config.variations,
      opts,
    );

    return base + states + variations;
  }

  static getComponentElementsCssRules(
    selector: string,
    elements: DeepPartial<BlizzConfigComponent['elements']> | undefined,
    opts?: BlizzServiceOptions,
  ) {
    if (!elements) return '';

    const propsWithElementPrefix = BlizzService.getComponentPropsWithElementPrefix(elements);

    return BlizzService.getCssRule(
      `${ancestor(opts)} ${prefix(opts)}${selector}${suffix(opts)}`.trim(),
      propsWithElementPrefix,
    );
  }

  static getComponentPropsWithElementPrefix(
    elements: DeepPartial<BlizzConfigComponent['elements']> | undefined,
  ) {
    return merge(
      {},
      ...map(elements, (props, element) =>
        element === 'base'
          ? props!.styles!
          : mapKeys(props!.styles!, (value, prop) => `${element}_${prop}`),
      ),
    );
  }

  static getComponentStatesCssRules(
    selector: string,
    states: BlizzConfigComponent['states'] | undefined,
    opts?: BlizzServiceOptions,
  ) {
    if (!states) return '';
    return joinProperties(states, (state, elements) => {
      return BlizzService.getComponentElementsCssRules(
        BlizzService.getStateSelector(selector, state, opts),
        elements,
        opts,
      );
    });
  }

  static getStateSelector(baseSelector: string, state: string, opts?: BlizzServiceOptions) {
    const isNative = (Object.values(AnyNativeState) as string[]).includes(state);
    const stateAttr = `[state-${state}=true]`;
    const pseudoClass = `:${state}`;

    const selectors = [
      stateAttr,
      ...(isNative ? [pseudoClass] : []),
      ...(opts?.customStateSelectors?.(state) ?? []),
    ];

    return selectors.length > 1
      ? `${baseSelector}:is(${selectors.join(', ')})`
      : `${baseSelector}${selectors[0]}`;
  }

  static getComponentVariationsCssRules(
    selector: string,
    variations: BlizzConfigComponent['variations'] | undefined,
    opts?: BlizzServiceOptions,
  ) {
    if (!variations) return '';
    return joinProperties(variations, (variation, config) => {
      if (!config) return '';
      const _selector = BlizzService.getVariationSelector(selector, variation, opts);
      const base = BlizzService.getComponentElementsCssRules(_selector, config.elements, opts);
      const states = BlizzService.getComponentStatesCssRules(_selector, config.states, opts);
      return base + states;
    });
  }

  static getVariationSelector(baseSelector: string, variation: string, opts?: BlizzServiceOptions) {
    const variationSelector =
      opts?.customVariationSelector?.(variation) ?? `[variation="${variation}"]`;
    return `${baseSelector}${variationSelector}`;
  }

  static getComponentsCssRules(
    config: Partial<BlizzConfigComponentsDictionary>,
    opts?: BlizzServiceOptions,
  ) {
    if (!config) return '';
    return joinProperties(config, (name, props) =>
      BlizzService.getComponentCssRules(name, props, opts),
    );
  }

  initiateBlizz() {
    return this.createGlobalCssFromConfig(this.config, this.options);
  }

  createGlobalCssFromConfig(
    config: {
      theme: BlizzTheme;
      components: Partial<BlizzConfigComponentsDictionary>;
    },
    opts?: BlizzServiceOptions,
  ) {
    const styleElement = this.document.createElement('style');

    const themeRule = BlizzService.getThemeCssRule(this.config.theme, opts);
    const componentRules = BlizzService.getComponentsCssRules(config.components, opts);

    const rules = `${themeRule}\n${componentRules}`;

    styleElement.appendChild(this.document.createTextNode(rules));

    const headElement = this.document.getElementsByTagName('head')[0];
    headElement.appendChild(styleElement);
    return styleElement;
  }
}

const ancestor = (opts?: BlizzServiceOptions) => opts?.ancestorSelector ?? '';
const prefix = (opts?: BlizzServiceOptions) => opts?.selectorPrefix ?? '';
const suffix = (opts?: BlizzServiceOptions) => opts?.selectorSuffix ?? '';
