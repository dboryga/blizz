import { BlizzComponentConfig, Props } from '../../models';
import { Dictionary } from '@blizz/core';

export interface BlizzChipsConfig extends BlizzComponentConfig {
  styles?: {
    padding?: string;
    border?: Props.Border;
    lineHeight?: string;
  };
  variations?: Dictionary<Omit<BlizzChipsConfig, 'variations'>>;
}
