import { BlizzComponentsConfig, BlizzPredefinedConfig } from '../models';
import { BLIZZ_UI_CONFIG } from './blizz-ui.config';
import { MATERIAL_CONFIG } from './material.config';

export const PREDEFINED_CONFIGS: {
  [key in BlizzPredefinedConfig]: BlizzComponentsConfig;
} = {
  [BlizzPredefinedConfig.Blizz]: BLIZZ_UI_CONFIG,
  [BlizzPredefinedConfig.Material]: MATERIAL_CONFIG,
};
