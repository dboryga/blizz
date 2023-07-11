import { Nested } from '@blizz-ui/core';
import { Dictionary, PickProperties, StrictOmit, ValueOf } from 'ts-essentials';

export const BlizzPredefinedTheme = {
  Crystal: 'crystal',
} as const;
export type BlizzPredefinedTheme = ValueOf<typeof BlizzPredefinedTheme>;

export type BlizzConfigTheme = BlizzTheme & {
  base?: BlizzPredefinedTheme;
};

export const BlizzColorShadeKey = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type BlizzColorShadeKey = ValueOf<typeof BlizzColorShadeKey>;
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
