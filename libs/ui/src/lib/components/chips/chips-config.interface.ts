import { Props } from '../../models';
import { Dictionary } from '@blizz/core';

export interface BlizzChipsConfig {
  padding?: string;
  border?: Props.Border;
  lineHeight?: string;
  variations?: Dictionary<BlizzChipsConfig>;
}
