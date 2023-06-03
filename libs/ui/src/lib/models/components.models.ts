import { BlizzChipsConfig, BlizzInputConfig } from '../components';
import { Dictionary } from '@blizz/core';

export interface BlizzComponentConfig {
  styles?: Dictionary;
  variations?: Dictionary<Omit<BlizzComponentConfig, 'variations'>>;
}

export interface BlizzComponentsConfigs extends Dictionary<BlizzComponentConfig> {
  chips: BlizzChipsConfig;
  input: BlizzInputConfig;
}
