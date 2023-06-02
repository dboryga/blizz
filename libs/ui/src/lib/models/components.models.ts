import { BlizzChipsConfig } from '../components';
import { Dictionary } from '@blizz/core';

export enum BlizzComponentConfigName {
  Chips = 'chips',
}

export interface BlizzComponentsConfig extends Dictionary<Dictionary> {
  chips: BlizzChipsConfig;
}
