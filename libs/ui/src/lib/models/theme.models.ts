import { Dictionary, ValueOf } from 'ts-essentials';

export const BLIZZ_PREDEFINED_THEME = {
  Crystal: 'crystal',
} as const;
export type BlizzPredefinedTheme = ValueOf<typeof BLIZZ_PREDEFINED_THEME>;

export interface BlizzConfigTheme extends BlizzTheme {
  base: BlizzPredefinedTheme;
}

export type BlizzTheme = Dictionary<string>;
