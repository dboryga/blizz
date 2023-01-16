import { BlizzChipsConfig } from '../components';

export enum BlizzComponentConfigName {
  Chips = 'chips',
}

export interface BlizzComponentsConfig {
  [BlizzComponentConfigName.Chips]: BlizzChipsConfig;
}
