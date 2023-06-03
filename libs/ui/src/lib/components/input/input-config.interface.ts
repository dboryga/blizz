import { BlizzComponentConfig, Props } from '../../models';
import { Dictionary } from '@blizz/core';

export interface BlizzInputConfig extends BlizzComponentConfig {
  styles?: {
    padding?: string;
    border?: Props.Border;
    lineHeight?: string;
    color?: string;
    backgroundColor?: string;
  };
  variations?: Dictionary<Omit<BlizzInputConfig, 'variations'>>;
}
