import { Props } from '../../models';
import { Dictionary } from '@blizz/core';

export interface BlizzInputConfig {
  // Sizing
  padding?: string;
  border?: Props.Border;
  // Text
  lineHeight?: string;
  // Colors
  color?: string;
  backgroundColor?: string;

  variations?: Dictionary<BlizzInputConfig>;
}
