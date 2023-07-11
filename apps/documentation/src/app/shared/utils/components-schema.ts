import {
  BLIZZ_HOST_ELEMENT_KEY,
  BlizzConfigComponentsDictionary,
  ComponentKey,
} from '@blizz-ui/components';
import { objectified, objectifyType } from 'ts-objectify-type';
import { get } from 'lodash';

export class ComponentsSchema {
  static schema = objectifyType<BlizzConfigComponentsDictionary>();

  static getComponentSchema(key: ComponentKey) {
    const schema = ComponentsSchema.schema?.find((item) => get(item, 'key') === key);
    if (!schema || !objectified.isReference(schema)) {
      throw new Error(`Blizz Customizer: Component '${key}' schema not found.`);
    }

    return schema;
  }

  static getElementsSchema(componentSchema: objectified.ReferenceType) {
    const elementsSchema = componentSchema.props?.find((prop) => get(prop, 'key') === 'elements');
    if (!elementsSchema || !objectified.isReference(elementsSchema)) {
      throw new Error(`Blizz Customizer: Component has no elements.`);
    }
    return elementsSchema;
  }

  static getStatesFromSchema(componentSchema: objectified.ReferenceType): string[] {
    if (!objectified.isReference(componentSchema)) return [];

    const statesUnion = componentSchema.typeArguments?.[1];
    if (!statesUnion || !objectified.isUnion(statesUnion)) return [];

    return statesUnion.unionOf.map((state) => JSON.parse(state.type));
  }

  static getComponentElementsInterfaceString(elementsSchema: objectified.ReferenceType): string {
    return (
      elementsSchema.props?.reduce((str, prop) => {
        if (!objectified.isProperty(prop)) return str;
        return prop.key === BLIZZ_HOST_ELEMENT_KEY
          ? `${ComponentsSchema.stringifyType(prop)}\n${str}`
          : `${str}${ComponentsSchema.stringifyType(prop)}\n`;
      }, '') ?? ''
    );
  }

  static stringifyType(prop: objectified.Type, tabStr = ''): string {
    let keyString = '';

    if (objectified.isProperty(prop)) {
      keyString = `${tabStr}${prop.key.toString()}${prop.required ? '' : '?'}: `;
    }

    if (objectified.isUnion(prop)) {
      const unionStr = prop.unionOf
        .map((member) => ComponentsSchema.stringifyType(member, tabStr))
        .join(' | ');
      return `${keyString}${unionStr}`;
    }

    if (objectified.isIntersection(prop)) {
      const intersectionStr = prop.intersectionOf
        .map((member) => ComponentsSchema.stringifyType(member, tabStr))
        .join(' & ');
      return `${keyString}${intersectionStr}`;
    }

    if (objectified.hasProps(prop)) {
      const propsStr = `{\n${prop.props
        .map((_prop) => `${ComponentsSchema.stringifyType(_prop, tabStr + '  ')};`)
        .join('\n')}\n${tabStr}}`;
      return `${keyString}${propsStr}`;
    }

    return `${keyString}${prop.type}`;
  }
}
