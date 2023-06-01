import {
  BlizzComponentConfigName,
  BlizzConfig,
  BlizzConfigValue,
  BlizzPredefinedConfig,
  BlizzPredefinedTheme,
} from './models';
import { inject, InjectionToken } from '@angular/core';
import { PREDEFINED_CONFIGS } from './configs';
import { PREDEFINED_THEMES } from './themes/themes';
import * as _ from 'lodash';

export const DEFAULT_BLIZZ_CONFIG: Readonly<BlizzConfig> = {
  base: BlizzPredefinedConfig.Blizz,
  theme: BlizzPredefinedTheme.Crystal,
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

export const injectComponentConfig = (componentName: BlizzComponentConfigName) => {
  const config = inject(BLIZZ_CONFIG);
  return config.components[componentName];
};
