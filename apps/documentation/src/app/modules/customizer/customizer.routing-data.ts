import { ValueOf } from 'ts-essentials';

export const CUSTOMIZER_PARAM = {
  Component: 'component',
} as const;
export type CustomizerParam = ValueOf<typeof CUSTOMIZER_PARAM>;

export const CUSTOMIZER_SETTINGS_GROUP = {
  Elements: 'elements',
  States: 'states',
  Variations: 'variations',
  Interactions: 'interactions',
  Animations: 'animations',
  Snippet: 'snippet',
  Config: 'config',
} as const;
export type CustomizerSettingsGroup = ValueOf<typeof CUSTOMIZER_SETTINGS_GROUP>;
