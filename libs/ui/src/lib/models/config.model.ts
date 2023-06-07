import { BlizzConfigTheme, BlizzPredefinedTheme, BlizzTheme } from './theme.model';
import { DeepPartial, Dictionary, SafeDictionary, ValueOf } from 'ts-essentials';
import { BlizzConfigChip, BlizzConfigInput } from '../components';
import { NativeElementState } from './state.model';
import { Nested } from '@blizz/core';

export interface BlizzConfig {
  base: BlizzPredefinedConfig;
  theme?: BlizzPredefinedTheme | BlizzConfigTheme;
  components?: DeepPartial<BlizzConfigComponentsDictionary>;
}

export interface BlizzConfigValue {
  theme: BlizzTheme;
  components: BlizzConfigComponentsDictionary;
}

export const BLIZZ_PREDEFINED_CONFIG = {
  Blizz: 'blizz',
  Material: 'material',
} as const;
export type BlizzPredefinedConfig = ValueOf<typeof BLIZZ_PREDEFINED_CONFIG>;

export interface BlizzConfigComponentElement<_Styles extends Nested<string> = Nested<string>> {
  styles: _Styles;
}

export type BlizzConfigComponentElementsDictionary<
  _Element extends BlizzConfigComponentElement = BlizzConfigComponentElement,
> = SafeDictionary<_Element>;

export interface BlizzConfigComponent<
  _Elements extends BlizzConfigComponentElementsDictionary = BlizzConfigComponentElementsDictionary,
  _States extends string = NativeElementState,
> {
  elements: _Elements;
  states: SafeDictionary<DeepPartial<_Elements>, _States>;
  variations: Dictionary<Omit<DeepPartial<BlizzConfigComponent<_Elements, _States>>, 'variations'>>;
}

export interface BlizzConfigComponentsDictionary extends Dictionary<BlizzConfigComponent> {
  chip: BlizzConfigChip;
  input: BlizzConfigInput;
}

export type ComponentKey = keyof BlizzConfigComponentsDictionary;
