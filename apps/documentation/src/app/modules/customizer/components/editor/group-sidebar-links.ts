import { CustomizerSettingsGroups } from '../../customizer.routing-data';

export interface GroupSidebarLink {
  path: string;
  icon: string;
  label: string;
}

export const GroupSidebarLinksData: GroupSidebarLink[] = [
  {
    path: CustomizerSettingsGroups.General,
    icon: 'extension',
    label: 'General',
  },
  {
    path: CustomizerSettingsGroups.Sizing,
    icon: 'zoom_out_map',
    label: 'Sizing',
  },
  {
    path: CustomizerSettingsGroups.Text,
    icon: 'format_size',
    label: 'Text',
  },
  {
    path: CustomizerSettingsGroups.Colors,
    icon: 'palette',
    label: 'Colors',
  },
  {
    path: CustomizerSettingsGroups.Interactions,
    icon: 'touch_app',
    label: 'Interactions',
  },
  {
    path: CustomizerSettingsGroups.Animations,
    icon: 'animation',
    label: 'Animations',
  },
  {
    path: CustomizerSettingsGroups.Config,
    icon: 'data_object',
    label: 'Get config',
  },
];
