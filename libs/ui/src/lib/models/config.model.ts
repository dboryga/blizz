import { BlizzConfigTheme, BlizzPredefinedTheme, BlizzTheme } from './theme.model';
import { DeepPartial, Dictionary, SafeDictionary, ValueOf } from 'ts-essentials';
import { Nested } from '@blizz/core';
import { NativeElementState } from './state.model';
import { BlizzConfigChip } from '../components/chip';
import { BlizzConfigInput } from '../components/input';
import { BlizzConfigIcon } from '../components/icon';
import { BlizzConfigButton } from '../components/button';

export interface BlizzConfig {
  base: BlizzPredefinedConfig;
  theme?: BlizzPredefinedTheme | BlizzConfigTheme;
  components?: DeepPartial<BlizzConfigComponentsDictionary>;
}

export interface BlizzConfigValue {
  theme: BlizzTheme;
  components: BlizzConfigComponentsDictionary;
}

export const BlizzPredefinedConfig = {
  Blizz: 'blizz',
  Material: 'material',
} as const;
export type BlizzPredefinedConfig = ValueOf<typeof BlizzPredefinedConfig>;

export interface BlizzConfigComponentElement<_Styles extends Nested<string> = Nested<string>> {
  styles: _Styles;
}

export type BlizzConfigComponentElementsDictionary<
  _Element extends BlizzConfigComponentElement = BlizzConfigComponentElement,
> = SafeDictionary<_Element>;

export type BlizzConfigComponentVariationsDictionary<
  _Elements extends BlizzConfigComponentElementsDictionary = BlizzConfigComponentElementsDictionary,
  _States extends string = NativeElementState,
> = Dictionary<Omit<DeepPartial<BlizzConfigComponent<_Elements, _States>>, 'variations'>>;

export interface BlizzConfigComponent<
  _Elements extends BlizzConfigComponentElementsDictionary = BlizzConfigComponentElementsDictionary,
  _States extends string = NativeElementState,
> {
  elements: _Elements;
  states: SafeDictionary<DeepPartial<_Elements>, _States>;
  variations: BlizzConfigComponentVariationsDictionary<_Elements, _States>;
}

export const BLIZZ_HOST_ELEMENT_KEY = 'body';

export type BlizzConfigComponentsDictionary = {
  chip: BlizzConfigChip;
  input: BlizzConfigInput;
  icon: BlizzConfigIcon;
  button: BlizzConfigButton;
  // iconButton: BlizzConfigIconButton;
};

export type ComponentKey = keyof BlizzConfigComponentsDictionary;
