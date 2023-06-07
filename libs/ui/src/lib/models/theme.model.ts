import { Nested } from '@blizz/core';
import { Dictionary, PickProperties, StrictOmit, ValueOf } from 'ts-essentials';

export const BLIZZ_PREDEFINED_THEME = {
  Crystal: 'crystal',
} as const;
export type BlizzPredefinedTheme = ValueOf<typeof BLIZZ_PREDEFINED_THEME>;

export type BlizzConfigTheme = BlizzTheme & {
  base: BlizzPredefinedTheme;
};

export const BLIZZ_COLOR_SHADE_KEYS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type BlizzColorShadeKey = ValueOf<typeof BLIZZ_COLOR_SHADE_KEYS>;
export interface BlizzColorShade extends Dictionary<string, BlizzColorShadeKey> {
  default?: BlizzColorShadeKey;
}

export interface BlizzPaletteConfig {
  white: string;
  black: string;
  neutral: BlizzColorShade;
  primary: BlizzColorShade;
  secondary: BlizzColorShade;
  tertiary?: BlizzColorShade;
  success: BlizzColorShade;
  warning: BlizzColorShade;
  info: BlizzColorShade;
  error: BlizzColorShade;
}

export interface BlizzThemeConfig extends BlizzPaletteConfig {
  text: string;
  textOpposite?: string;
}

export type ThemeColorName =
  | keyof BlizzThemeConfig
  | `${keyof PickProperties<Required<BlizzThemeConfig>, BlizzColorShade>}-${keyof StrictOmit<
      BlizzColorShade,
      'default'
    >}`;

export type BlizzCustomThemeConfig = Nested<string>;

export type BlizzTheme = BlizzThemeConfig | BlizzCustomThemeConfig;
