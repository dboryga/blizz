import { camelToSentenceCase, firstLetterUpper } from '@blizz-ui/core';
import { BlizzConfigComponent, BlizzService, ComponentKey } from '@blizz-ui/components';
import { get, keys, omit } from 'lodash';
import { objectified } from 'ts-objectify-type';
import { PROPERTY_DISPLAY_NAME } from './display-names';
import { DeepPartial, Dictionary } from 'ts-essentials';
import { unique } from 'ng-packagr/lib/utils/array';
import { ComponentsSchema } from '../../../shared/utils/components-schema';

export type SidebarProperty = Partial<objectified.Type> & {
  // Keys
  key: string;
  componentKey: string;
  elementKey: string;
  variationKey?: string;
  stateKey?: string;
  // Names
  fullName: string;
  displayName: string;
  fullDisplayName: string;
  // Paths
  path: string;
  variationPath: string;
  elementPath: string;
  statePath: string;
  propPath: string;
  // Values
  value?: string | undefined;
  inheritedValue: () => string | undefined;
  cssVariable?: string;
  // Children
  children?: SidebarProperty[];
};

export type SidebarElements = Dictionary<SidebarProperty[]>;

export interface SidebarState {
  key: string;
  elements: SidebarElements;
}

export interface SidebarVariation {
  key: string;
  elements: SidebarElements;
  states: SidebarState[];
}

export type SidebarData = {
  elements: SidebarElements | null;
  states?: SidebarState[] | null;
  variations?: SidebarVariation[] | null;
};

export function createSidebarData(
  key: ComponentKey,
  baseConfig: BlizzConfigComponent,
  config: DeepPartial<BlizzConfigComponent> | undefined,
): SidebarData {
  const schema = ComponentsSchema.getComponentSchema(key);
  const elementsSchema = ComponentsSchema.getElementsSchema(schema);

  const elements = mapElements(elementsSchema, key, config, baseConfig);
  const states = mapStates(schema, elementsSchema, key, config, baseConfig);
  const variations = mapVariations(schema, elementsSchema, key, config, baseConfig);

  return {
    elements,
    states,
    variations,
  };
}

export function mapVariations(
  componentSchema: objectified.ReferenceType,
  elementsSchema: objectified.Type,
  componentKey: ComponentKey,
  config: DeepPartial<BlizzConfigComponent> | undefined | null,
  baseConfig: DeepPartial<BlizzConfigComponent> | undefined | null,
): SidebarVariation[] | null {
  if (!objectified.hasProps(elementsSchema)) return null;

  const variationsKeys = unique([...keys(baseConfig?.variations), ...keys(config?.variations)]);
  return variationsKeys
    .map((variationKey) => {
      if (config?.variations?.[variationKey] === null) return null;

      return {
        key: variationKey,
        elements: mapElements(
          elementsSchema,
          componentKey,
          config,
          baseConfig,
          undefined,
          variationKey,
        ),
        states: mapStates(
          componentSchema,
          elementsSchema,
          componentKey,
          config,
          baseConfig,
          variationKey,
        ),
      };
    })
    .filter((variation): variation is SidebarVariation => !!variation?.key);
}

export function mapStates(
  componentSchema: objectified.ReferenceType,
  elementsSchema: objectified.Type,
  componentKey: ComponentKey,
  config: DeepPartial<BlizzConfigComponent> | undefined | null,
  baseConfig: DeepPartial<BlizzConfigComponent> | undefined | null,
  variationKey?: string,
): SidebarState[] | null {
  if (!objectified.hasProps(elementsSchema)) return null;

  return ComponentsSchema.getStatesFromSchema(componentSchema)
    .map((stateKey) => {
      if (config?.states?.[stateKey as keyof typeof config.states] === null) return null;

      return {
        key: stateKey,
        elements: mapElements(
          elementsSchema,
          componentKey,
          config,
          baseConfig,
          stateKey,
          variationKey,
        ),
      };
    })
    .filter((state): state is SidebarState | any => !!state?.key);
}

export function mapElements(
  elementsSchema: objectified.Type,
  componentKey: ComponentKey,
  config: DeepPartial<BlizzConfigComponent> | undefined | null,
  baseConfig: DeepPartial<BlizzConfigComponent> | undefined | null,
  stateKey?: string,
  variationKey?: string,
): SidebarElements | null {
  if (!objectified.hasProps(elementsSchema)) return null;

  return elementsSchema.props.reduce((obj, element, i) => {
    if (
      !objectified.isProperty(element) ||
      !objectified.hasProps(element) ||
      typeof element.key !== 'string'
    ) {
      console.warn(
        `Blizz Customizer: Component '${componentKey}' has invalid element schema at index ${i}`,
      );
      return obj;
    }

    const styles = element.props?.find(
      (_prop) => objectified.isProperty(_prop) && _prop.key === 'styles',
    );
    if (!styles || !objectified.isProperty(styles) || !objectified.hasProps(styles)) return obj;

    return {
      ...obj,
      [element.key]: mapProperties(
        styles.props,
        config,
        baseConfig,
        componentKey,
        element.key,
        stateKey,
        variationKey,
      ),
    };
  }, {});
}

function mapProperties(
  props: objectified.Type[],
  config: DeepPartial<BlizzConfigComponent> | undefined | null,
  baseConfig: DeepPartial<BlizzConfigComponent> | undefined | null,
  componentKey: ComponentKey,
  elementKey: string,
  stateKey?: string,
  variationKey?: string,
  parent?: SidebarProperty,
): SidebarProperty[] {
  if (!props) return [];
  return props
    .map((prop, i) => {
      if (!objectified.isProperty(prop) || typeof prop.key !== 'string') {
        throw new Error(
          `Blizz Customizer: Component element '${elementKey}' has invalid property at index ${i}`,
        );
      }

      const variationPath = variationKey ? `variations.${variationKey}` : '';
      const statePath = stateKey ? `states.${stateKey}` : '';
      const elementPath = `elements.${elementKey}`;
      const stateOrElementPath = statePath?.length ? `${statePath}.${elementKey}` : elementPath;
      const propPath = parent?.propPath ? `${parent.propPath}.${prop.key}` : prop.key;
      const stylesPath = `${dot(variationPath)}${stateOrElementPath}.styles`;
      const path = `${stylesPath}.${propPath}`;

      const fullName: string = parent?.fullName
        ? `${parent.fullName}${firstLetterUpper(prop.key)}`
        : prop.key;

      const displayName: string =
        get(PROPERTY_DISPLAY_NAME, propPath) ?? camelToSentenceCase(prop.key);

      const fullDisplayName: string = parent?.displayName
        ? `${parent.displayName} ${displayName.toLowerCase()}`
        : displayName;

      // Check for nested properties
      if (objectified.hasProps(prop)) {
        const data: SidebarProperty = {
          ...omit(prop, 'props'),
          // Keys
          key: prop.key,
          componentKey,
          elementKey,
          stateKey,
          variationKey,
          // Names
          fullName,
          displayName,
          fullDisplayName,
          // Paths
          path,
          variationPath,
          statePath,
          elementPath,
          propPath,
          // Values
          inheritedValue: () => undefined,
        };
        return {
          ...data,
          children: mapProperties(
            prop.props,
            config,
            baseConfig,
            componentKey,
            elementKey,
            stateKey,
            variationKey,
            data,
          ),
        };
      }

      const cssVariable = BlizzService.getCssVariable(componentKey, elementKey, fullName);

      const inheritFromElementPath = `${elementPath}.styles.${propPath}`;
      const inheritedFromElement = (path: string) =>
        (variationKey || stateKey) && path !== inheritFromElementPath
          ? get(config, inheritFromElementPath) ?? get(baseConfig, inheritFromElementPath)
          : undefined;

      const inheritedFromStatePath = `${statePath}.${elementKey}.styles.${propPath}`;
      const inheritedFromState = (path: string) =>
        stateKey && path !== inheritedFromStatePath
          ? get(config, inheritedFromStatePath) ?? get(baseConfig, inheritedFromStatePath)
          : undefined;

      const inheritedFromVariationPath = `${variationPath}.${elementPath}.styles.${propPath}`;
      const inheritedFromVariation = (path: string) =>
        variationKey && path !== inheritedFromVariationPath
          ? get(config, inheritedFromVariationPath) ?? get(baseConfig, inheritedFromVariationPath)
          : undefined;

      const inheritedValue = () =>
        get(baseConfig, path) ??
        inheritedFromState(path) ??
        inheritedFromVariation(path) ??
        inheritedFromElement(path);

      // Lowest level property (doesn't have any nested properties)
      return {
        ...prop,
        // Keys
        key: prop.key,
        componentKey,
        elementKey,
        stateKey,
        variationKey,
        // Names
        fullName,
        displayName,
        fullDisplayName,
        // Paths
        path,
        variationPath,
        statePath,
        elementPath,
        propPath,
        // Values
        value: get(config, path),
        inheritedValue,
        cssVariable,
      };
    })
    .filter(Boolean);
}

const dot = (str: string) => (str?.length ? `${str}.` : '');
