import { BlizzPredefinedTheme, BlizzTheme, BlizzThemeConfig } from './theme.models';
import { BlizzComponentsConfigs } from './components.models';

export interface BlizzConfig {
  base: BlizzPredefinedConfig | `${BlizzPredefinedConfig}`;
  theme?: BlizzPredefinedTheme | `${BlizzPredefinedTheme}` | BlizzThemeConfig;
  components?: Partial<BlizzComponentsConfigs>;
}

export interface BlizzConfigValue {
  theme: BlizzTheme;
  components: BlizzComponentsConfigs;
}

export enum BlizzPredefinedConfig {
  Blizz = 'blizz',
  Material = 'material',
}
