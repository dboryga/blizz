import {
  BLIZZ_PREDEFINED_CONFIG,
  BLIZZ_PREDEFINED_THEME,
  BlizzConfig,
  BlizzConfigComponent,
  BlizzConfigValue,
  ComponentKey,
} from './models';
import { inject, InjectionToken } from '@angular/core';
import { PREDEFINED_CONFIGS } from './configs';
import { PREDEFINED_THEMES } from './themes/themes';
import * as _ from 'lodash';
import { merge, omit } from 'lodash';

export const DEFAULT_BLIZZ_CONFIG: Readonly<BlizzConfig> = {
  base: BLIZZ_PREDEFINED_CONFIG.Blizz,
  theme: BLIZZ_PREDEFINED_THEME.Crystal,
};

export const setupConfig = (config?: BlizzConfig): BlizzConfigValue => {
  const themeConfig = config?.theme ?? DEFAULT_BLIZZ_CONFIG.theme!;
  const theme =
    typeof themeConfig === 'string'
      ? structuredClone(PREDEFINED_THEMES[themeConfig])
      : _.merge(structuredClone(PREDEFINED_THEMES[themeConfig.base]), structuredClone(themeConfig));

  const base = config?.base ?? DEFAULT_BLIZZ_CONFIG.base!;
  const components = _.merge(
    structuredClone(PREDEFINED_CONFIGS[base]),
    structuredClone(config?.components),
  );

  return { theme, components };
};

export const BLIZZ_CONFIG = new InjectionToken<Readonly<BlizzConfigValue>>('blizz-config', {
  providedIn: 'root',
  factory: () => setupConfig(),
});

export const injectThemeConfig = () => {
  const config = inject(BLIZZ_CONFIG);
  return config?.theme;
};

export const injectComponentConfig = <_Key extends ComponentKey>(componentKey: _Key) => {
  const config = inject(BLIZZ_CONFIG);
  return config.components[componentKey];
};

export const getVariationConfig = <
  _Key extends ComponentKey,
  _Config extends ReturnType<typeof injectComponentConfig<_Key>>,
>(
  config: _Config,
  variationName: keyof typeof config.variations | null,
): Omit<_Config, 'variations'> => {
  const baseConfig = omit(config, <keyof BlizzConfigComponent>'variations') as Omit<
    typeof config,
    'variations'
  >;
  const variationConfig = variationName ? config.variations[variationName] : {};

  return merge(baseConfig, variationConfig);
};
