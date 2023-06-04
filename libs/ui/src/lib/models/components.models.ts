import { BlizzConfigChip, BlizzConfigInput } from '../components';
import { Dictionary, SafeDictionary } from 'ts-essentials';

export type BlizzConfigStyles = {
  [key in string]?: string | BlizzConfigStyles;
};

export interface BlizzConfigComponentElement<
  _Styles extends BlizzConfigStyles = BlizzConfigStyles,
> {
  styles?: _Styles;
  interactions?: SafeDictionary<_Styles>;
}

export type BlizzConfigComponentElementsDictionary<
  _Element extends BlizzConfigComponentElement = BlizzConfigComponentElement,
> = SafeDictionary<_Element>;

export interface BlizzConfigComponent<
  _Elements extends BlizzConfigComponentElementsDictionary = BlizzConfigComponentElementsDictionary,
> {
  elements: _Elements;
  variations?: Dictionary<Omit<BlizzConfigComponent<_Elements>, 'variations'>>;
}

export interface BlizzConfigComponentsDictionary extends Dictionary<BlizzConfigComponent> {
  chip: BlizzConfigChip;
  input: BlizzConfigInput;
}
