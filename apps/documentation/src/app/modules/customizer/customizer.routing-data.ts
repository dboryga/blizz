import { ValueOf } from 'ts-essentials';

export const CustomizerParam = {
  Component: 'component',
  State: 'state',
  Variation: 'variation',
} as const;
export type CustomizerParam = ValueOf<typeof CustomizerParam>;

export const CustomizerSettingsGroup = {
  General: 'general',
  Elements: 'elements',
  States: 'states',
  Variations: 'variations',
  // Interactions: 'interactions',
  // Animations: 'animations',
  Snippet: 'snippet',
  Config: 'config',
} as const;
export type CustomizerSettingsGroup = ValueOf<typeof CustomizerSettingsGroup>;
