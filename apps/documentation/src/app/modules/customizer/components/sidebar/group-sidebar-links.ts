import { CustomizerSettingsGroup } from '../../customizer.routing-data';

export interface GroupSidebarLink {
  path: string;
  icon: string;
  label: string;
}

export const GroupSidebarLinksData: GroupSidebarLink[] = [
  {
    path: CustomizerSettingsGroup.General,
    icon: 'category',
    label: 'General',
  },
  {
    path: CustomizerSettingsGroup.Elements,
    icon: 'extension',
    label: 'Elements',
  },
  {
    path: CustomizerSettingsGroup.States,
    icon: 'family_history',
    label: 'States',
  },
  {
    path: CustomizerSettingsGroup.Variations,
    icon: 'shapes',
    label: 'Variations',
  },
  // {
  //   path: CustomizerSettingsGroup.Interactions,
  //   icon: 'touch_app',
  //   label: 'Interactions',
  // },
  // {
  //   path: CustomizerSettingsGroup.Animations,
  //   icon: 'animation',
  //   label: 'Animations',
  // },
  {
    path: CustomizerSettingsGroup.Snippet,
    icon: 'code',
    label: 'Snippet',
  },
  {
    path: CustomizerSettingsGroup.Config,
    icon: 'data_object',
    label: 'Get config',
  },
];
