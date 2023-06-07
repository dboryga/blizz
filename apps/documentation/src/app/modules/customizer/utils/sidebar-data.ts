import { camelToSentenceCase, firstLetterUpper, Nested } from '@blizz/core';
import { BlizzConfigComponent } from '@blizz/ui';
import { SafeDictionary } from 'ts-essentials';
import { mapValues } from 'lodash';

export interface SidebarProperty {
  name: string;
  fullName: string;
  displayName: string;
  fullDisplayName: string;
  value?: string;
  cssVariable?: string;
  props?: SidebarProperty[];
}

export function createSidebarData(
  componentConfig: BlizzConfigComponent,
  componentName: string,
): SafeDictionary<SidebarProperty[]> {
  // const data = new Map<CustomizerSettingsGroups, SidebarProperty[]>();
  //
  // mapProperties(componentConfig, componentName).forEach((prop) => {
  //   for (const [group, properties] of Object.entries(sidebarPropsByGroup)) {
  //     if (properties.includes(prop.name)) {
  //       const i = group as CustomizerSettingsGroups;
  //       data.has(i) ? data.get(i)?.push(prop) : data.set(i, [prop]);
  //       break;
  //     }
  //   }
  // });
  //
  // return data as SidebarData;

  return mapValues(componentConfig.elements, (props) => mapProperties(props?.styles, componentName));
}

function mapProperties(
  props: Nested<string> | undefined,
  componentName: string,
  parent: string = '',
): SidebarProperty[] {
  if (!props) return [];
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
