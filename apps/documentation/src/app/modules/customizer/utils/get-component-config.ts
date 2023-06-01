import { BlizzChipsConfig, BlizzComponentConfigName, Props } from '@blizz/ui';
import { runtime, schema } from 'ts-transformer-interface';
import { ComponentConfigGroups } from './component-config-groups';
import * as _ from 'lodash';
import { CustomizerSettingsGroups } from '../customizer.routing-data';
import { camelToSentenceCase } from '@blizz/core';

export interface NestedProperty extends runtime.Property {
  displayName: string;
  props?: runtime.Property[];
}

export type ComponentConfigSchema = {
  [key in CustomizerSettingsGroups]: NestedProperty[];
};

const componentsSchemas = {
  [BlizzComponentConfigName.Chips]: schema<BlizzChipsConfig>(),
};

const propsSchemas = [schema<Props.SquareDimensions>(), schema<Props.XY>(), schema<Props.Border>()];

function isValidComponentName(name: string): name is BlizzComponentConfigName {
  return Object.values(BlizzComponentConfigName).includes(name as BlizzComponentConfigName);
}

export function getComponentConfig(componentName: string | null): ComponentConfigSchema | null {
  if (!componentName || !isValidComponentName(componentName)) return null;

  const config: ComponentConfigSchema = _.mapValues(ComponentConfigGroups, () => []);

  componentsSchemas[componentName].props.forEach((prop) => {
    // Check for nested properties
    if (prop.type && typeof prop.type === 'object' && 'referenceName' in prop.type) {
      const { referenceName } = prop.type;
      const reference = propsSchemas.find((schema) => referenceName === schema.name);
      if (reference) Object.assign(prop.type, { props: reference.props });
    }

    // Add properties to config object based on theirs group
    for (const [group, properties] of Object.entries(ComponentConfigGroups)) {
      if (properties.includes(prop.name)) {
        config[group as CustomizerSettingsGroups].push({
          ...prop,
          displayName: camelToSentenceCase(prop.name),
        });
        break;
      }
    }
  });

  return config;
}
