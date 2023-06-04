import { CUSTOMIZER_SETTINGS_GROUPS } from '../../customizer.routing-data';

export interface GroupSidebarLink {
  path: string;
  icon: string;
  label: string;
}

export const GroupSidebarLinksData: GroupSidebarLink[] = [
  {
    path: CUSTOMIZER_SETTINGS_GROUPS.Elements,
    icon: 'extension',
    label: 'Elements',
  },
  // {
  //   path: CUSTOMIZER_SETTINGS_GROUPS.Sizing,
  //   icon: 'zoom_out_map',
  //   label: 'Sizing',
  // },
  // {
  //   path: CUSTOMIZER_SETTINGS_GROUPS.Text,
  //   icon: 'format_size',
  //   label: 'Text',
  // },
  // {
  //   path: CUSTOMIZER_SETTINGS_GROUPS.Colors,
  //   icon: 'palette',
  //   label: 'Colors',
  // },
  {
    path: CUSTOMIZER_SETTINGS_GROUPS.Interactions,
    icon: 'touch_app',
    label: 'Interactions',
  },
  {
    path: CUSTOMIZER_SETTINGS_GROUPS.Animations,
    icon: 'animation',
    label: 'Animations',
  },
  {
    path: CUSTOMIZER_SETTINGS_GROUPS.Config,
    icon: 'data_object',
    label: 'Get config',
  },
];
