import { BlizzConfigTheme, BlizzPredefinedTheme, BlizzTheme } from './theme.model';
import { DeepPartial, Dictionary, SafeDictionary, ValueOf } from 'ts-essentials';
import { Nested } from '@blizz-ui/core';
import { NativeElementState } from './state.model';
import { BlizzConfigChip } from '../components/chip';
import { BlizzConfigTextField } from '../components/text-field';
import { BlizzConfigIcon } from '../components/icon';
import { BlizzConfigButton } from '../components/button';
import { BlizzConfigExpansionPanel } from '../components/expansion-panel';
import { BlizzConfigAccordion } from '../components/accordion';
import { BlizzConfigIconButton } from '../components/icon-button';
import { BlizzConfigSelect } from '../components/select';

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
  accordion: BlizzConfigAccordion;
  button: BlizzConfigButton;
  chip: BlizzConfigChip;
  expansionPanel: BlizzConfigExpansionPanel;
  icon: BlizzConfigIcon;
  iconButton: BlizzConfigIconButton;
  textField: BlizzConfigTextField;
  select: BlizzConfigSelect;
};

export type ComponentKey = keyof BlizzConfigComponentsDictionary;
