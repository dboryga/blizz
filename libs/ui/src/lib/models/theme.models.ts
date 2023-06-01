import { Dictionary } from '@blizz/core';

export enum BlizzPredefinedTheme {
  Crystal = 'crystal',
}

export interface BlizzThemeConfig extends BlizzTheme {
  base: BlizzPredefinedTheme;
}

export type BlizzTheme = Dictionary<string>;
