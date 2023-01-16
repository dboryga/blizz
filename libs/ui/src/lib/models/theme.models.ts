export enum BlizzPredefinedTheme {
  Crystal = 'crystal',
}

export interface BlizzThemeConfig extends BlizzTheme {
  base: BlizzPredefinedTheme;
}

export interface BlizzTheme {
  [key: string]: string;
}
