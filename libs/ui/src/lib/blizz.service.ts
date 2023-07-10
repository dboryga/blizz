import { inject, Injectable } from '@angular/core';
import { BLIZZ_CONFIG, BLIZZ_SERVICE_OPTIONS } from './config';
import { DOCUMENT } from '@angular/common';
import { flattenObject } from './utils';
import {
  AnyNativeState,
  BLIZZ_HOST_ELEMENT_KEY,
  BlizzColorShade,
  BlizzColorShadeKey,
  BlizzConfigComponent,
  BlizzConfigComponentsDictionary,
  BlizzTheme,
  ComponentKey,
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

const attributeSelectors: ComponentKey[] = ['button', 'iconButton'];

@Injectable()
export class BlizzService {
  readonly config = inject(BLIZZ_CONFIG);
  readonly options = inject(BLIZZ_SERVICE_OPTIONS);
  protected readonly document = inject(DOCUMENT);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getCssString(obj: Dictionary<string>, opts?: BlizzServiceOptions): string {
    if (!obj) return '';
    return joinProperties(obj, (key, value) => `\t${camelToKebabCase(key)}: ${value};`);
  }

  static getCssVariables<_Config>(config: _Config, prefix = '', opts?: BlizzServiceOptions) {
    if (!config) return '';
    return BlizzService.getCssString(flattenObject(config, '-', prefix), opts);
  }
  static getCssRule<_Props>(
    selector: string,
    props?: _Props,
    propsPrefix = '',
    opts?: BlizzServiceOptions,
  ) {
    if (!props) return '';
    return `${selector} {\n${BlizzService.getCssVariables(props, propsPrefix, opts)}\n}\n`;
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
      opts,
    );
  }

  static getComponentCssRules(
    key: ComponentKey,
    config: BlizzConfigComponent,
    opts?: BlizzServiceOptions,
  ): string {
    const componentSelector = `bzz-${camelToKebabCase(key)}`;
    const selector = attributeSelectors.includes(key)
      ? `[${componentSelector}]`
      : componentSelector;
    const base = BlizzService.getComponentElementsCssRules(key, selector, config.elements, opts);
    const states = BlizzService.getComponentStatesCssRules(key, selector, config.states, opts);
    const variations = BlizzService.getComponentVariationsCssRules(
      key,
      selector,
      config.variations,
      opts,
    );

    return base + states + variations;
  }

  static getComponentElementsCssRules(
    componentKey: ComponentKey,
    selector: string,
    elements: DeepPartial<BlizzConfigComponent['elements']> | undefined,
    opts?: BlizzServiceOptions,
  ) {
    if (!elements) return '';

    const propsWithElementPrefix = BlizzService.getComponentPropsWithPrefix(componentKey, elements);

    return BlizzService.getCssRule(
      `${ancestor(opts)} ${prefix(opts)}${selector}${suffix(opts)}`.trim(),
      propsWithElementPrefix,
      undefined,
      opts,
    );
  }

  static getComponentPropsWithPrefix(
    componentKey: ComponentKey,
    elements: DeepPartial<BlizzConfigComponent['elements']> | undefined,
  ) {
    return merge(
      {},
      ...map(elements, (props, elementKey) =>
        mapKeys(props!.styles!, (value, propKey) =>
          BlizzService.getCssVariable(componentKey, elementKey, propKey),
        ),
      ),
    );
  }

  static getCssVariable(componentKey: ComponentKey, elementKey = '', propertyKey = '') {
    if (elementKey === BLIZZ_HOST_ELEMENT_KEY) elementKey = '';
    const component = componentKey ? `--bzz-${camelToKebabCase(componentKey)}` : '';
    const element = elementKey ? `-${camelToKebabCase(elementKey)}` : '';
    const property = propertyKey ? `_${camelToKebabCase(propertyKey)}` : '';
    return `${component}${element}${property}`;
  }

  static getComponentStatesCssRules(
    componentKey: ComponentKey,
    selector: string,
    states: BlizzConfigComponent['states'] | undefined,
    opts?: BlizzServiceOptions,
  ) {
    if (!states) return '';
    return joinProperties(states, (state, elements) => {
      return BlizzService.getComponentElementsCssRules(
        componentKey,
        BlizzService.getStateSelector(selector, state, opts),
        elements,
        opts,
      );
    });
  }

  static getStateSelector(baseSelector: string, state: string, opts?: BlizzServiceOptions) {
    const isNative = (Object.values(AnyNativeState) as string[]).includes(state);
    const stateAttr = `[state-${state}="true"]`;
    const pseudoClass = `:${camelToKebabCase(state)}`;

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
    componentKey: ComponentKey,
    selector: string,
    variations: BlizzConfigComponent['variations'] | undefined,
    opts?: BlizzServiceOptions,
  ) {
    if (!variations) return '';
    return joinProperties(variations, (variation, config) => {
      if (!config) return '';
      const _selector = BlizzService.getVariationSelector(selector, variation, opts);
      const base = BlizzService.getComponentElementsCssRules(
        componentKey,
        _selector,
        config.elements,
        opts,
      );
      const states = BlizzService.getComponentStatesCssRules(
        componentKey,
        _selector,
        config.states,
        opts,
      );
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
    return joinProperties(config, (key, props) =>
      BlizzService.getComponentCssRules(key as ComponentKey, props, opts),
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
