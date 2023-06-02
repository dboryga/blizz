import { Props } from '../../models';
import { Dictionary } from '@blizz/core';

export interface BlizzChipsConfig extends Dictionary {
  padding?: string;
  border?: Props.Border;
  lineHeight?: string;
}
