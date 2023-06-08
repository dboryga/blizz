import { CUSTOMIZER_SETTINGS_GROUP } from '../../customizer.routing-data';

export interface GroupSidebarLink {
  path: string;
  icon: string;
  label: string;
}

export const GroupSidebarLinksData: GroupSidebarLink[] = [
  {
    path: CUSTOMIZER_SETTINGS_GROUP.Elements,
    icon: 'extension',
    label: 'Elements',
  },
  {
    path: CUSTOMIZER_SETTINGS_GROUP.States,
    icon: 'family_history',
    label: 'States',
  },
  {
    path: CUSTOMIZER_SETTINGS_GROUP.Variations,
    icon: 'shapes',
    label: 'Variations',
  },
  {
    path: CUSTOMIZER_SETTINGS_GROUP.Interactions,
    icon: 'touch_app',
    label: 'Interactions',
  },
  {
    path: CUSTOMIZER_SETTINGS_GROUP.Animations,
    icon: 'animation',
    label: 'Animations',
  },
  {
    path: CUSTOMIZER_SETTINGS_GROUP.Snippet,
    icon: 'code',
    label: 'Snippet',
  },
  {
    path: CUSTOMIZER_SETTINGS_GROUP.Config,
    icon: 'data_object',
    label: 'Get config',
  },
];
