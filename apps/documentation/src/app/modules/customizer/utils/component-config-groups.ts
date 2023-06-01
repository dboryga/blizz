import { CustomizerSettingsGroups } from '../customizer.routing-data';

export const ComponentConfigGroups: { [key in CustomizerSettingsGroups]: string[] } = {
  [CustomizerSettingsGroups.General]: [],
  [CustomizerSettingsGroups.Sizing]: ['padding', 'border'],
  [CustomizerSettingsGroups.Text]: ['lineHeight'],
  [CustomizerSettingsGroups.Colors]: [],
  [CustomizerSettingsGroups.Interactions]: [],
  [CustomizerSettingsGroups.Animations]: [],
  [CustomizerSettingsGroups.Config]: [],
};
