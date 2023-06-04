import { BlizzConfigComponentsDictionary, BlizzPredefinedConfig } from '../models';
import { BLIZZ_UI_CONFIG } from './blizz-ui.config';
import { MATERIAL_CONFIG } from './material.config';

export const PREDEFINED_CONFIGS: Record<
  BlizzPredefinedConfig,
  Readonly<BlizzConfigComponentsDictionary>
> = {
  blizz: BLIZZ_UI_CONFIG,
  material: MATERIAL_CONFIG,
};
