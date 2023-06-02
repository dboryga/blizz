import { BlizzPredefinedTheme, BlizzTheme, BlizzThemeConfig } from './theme.models';
import { BlizzComponentsConfig } from './components.models';

export interface BlizzConfig {
  base?: BlizzPredefinedConfig | `${BlizzPredefinedConfig}`;
  theme?: BlizzPredefinedTheme | `${BlizzPredefinedTheme}` | BlizzThemeConfig;
  components?: Partial<BlizzComponentsConfig>;
}

export interface BlizzConfigValue {
  theme: BlizzTheme;
  components: BlizzComponentsConfig;
}

export enum BlizzPredefinedConfig {
  Blizz = 'blizz',
  Material = 'material',
}
