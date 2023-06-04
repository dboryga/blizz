import { BlizzPredefinedTheme, BlizzTheme, BlizzConfigTheme } from './theme.models';
import { BlizzConfigComponentsDictionary } from './components.models';
import { DeepRequired, ValueOf } from 'ts-essentials';

export interface BlizzConfig {
  base: BlizzPredefinedConfig;
  theme?: BlizzPredefinedTheme | BlizzConfigTheme;
  components?: Partial<BlizzConfigComponentsDictionary>;
}

export interface BlizzConfigValue {
  theme: DeepRequired<BlizzTheme>;
  components: DeepRequired<BlizzConfigComponentsDictionary>;
}

export const BLIZZ_PREDEFINED_CONFIG = {
  Blizz: 'blizz',
  Material: 'material',
} as const;
export type BlizzPredefinedConfig = ValueOf<typeof BLIZZ_PREDEFINED_CONFIG>;
