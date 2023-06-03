import { camelToSentenceCase, Dictionary, firstLetterUpper } from '@blizz/core';
import { BlizzService } from '@blizz/ui';
import { CustomizerSettingsGroups } from '../customizer.routing-data';

export interface SidebarProperty {
  name: string;
  fullName: string;
  displayName: string;
  fullDisplayName: string;
  value?: string;
  cssVariable?: string;
  props?: SidebarProperty[];
}

export type SidebarData = ReadonlyMap<CustomizerSettingsGroups, SidebarProperty[]>;

export const sidebarPropsByGroup: { [key in CustomizerSettingsGroups]: string[] } = {
  [CustomizerSettingsGroups.General]: [],
  [CustomizerSettingsGroups.Sizing]: ['padding', 'border'],
  [CustomizerSettingsGroups.Text]: ['lineHeight'],
  [CustomizerSettingsGroups.Colors]: [],
  [CustomizerSettingsGroups.Interactions]: [],
  [CustomizerSettingsGroups.Animations]: [],
  [CustomizerSettingsGroups.Config]: [],
};

export function createSidebarData(componentConfig: Dictionary, componentName: string): SidebarData {
  const data = new Map<CustomizerSettingsGroups, SidebarProperty[]>();

  mapProperties(componentConfig, componentName).forEach((prop) => {
    for (const [group, properties] of Object.entries(sidebarPropsByGroup)) {
      if (properties.includes(prop.name)) {
        const i = group as CustomizerSettingsGroups;
        data.has(i) ? data.get(i)?.push(prop) : data.set(i, [prop]);
        break;
      }
    }
  });

  return data as SidebarData;
}

function mapProperties(
  props: Dictionary,
  componentName: string,
  parent: string = '',
): SidebarProperty[] {
  return Object.entries(props).map(([name, value]) => {
    const fullName = parent ? `${parent}${firstLetterUpper(name)}` : name;

    // Check for nested properties
    if (typeof value === 'object') {
      return {
        name,
        fullName,
        displayName: camelToSentenceCase(name),
        fullDisplayName: camelToSentenceCase(fullName),
        props: mapProperties(value, componentName, fullName),
      };
    }

    // Lowest level property (doesn't have any nested properties)
    return {
      name,
      fullName,
      value,
      displayName: camelToSentenceCase(name),
      fullDisplayName: camelToSentenceCase(fullName),
      // cssVariable: BlizzService.getComponentCssVariable(componentName, fullName),
    };
  });
}
