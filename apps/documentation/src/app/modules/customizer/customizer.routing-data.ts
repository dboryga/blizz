import { ValueOf } from 'ts-essentials';

export const CUSTOMIZER_PARAMS = {
  Component: 'component',
  SettingsGroup: 'settingsGroup',
} as const;
export type CustomizerParams = ValueOf<typeof CUSTOMIZER_PARAMS>;

export const CUSTOMIZER_SETTINGS_GROUPS = {
  Elements: 'elements',
  States: 'sizing',
  Text: 'text',
  // Colors: 'colors',
  Interactions: 'interactions',
  Animations: 'animations',
  Config: 'config',
} as const;
export type CustomizerSettingsGroups = ValueOf<typeof CUSTOMIZER_SETTINGS_GROUPS>;
