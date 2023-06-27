import { BlizzConfigComponentsDictionary } from '../models';
import { CHIPS_MATERIAL_CONFIG } from '../components/chip';
import { INPUT_MATERIAL_CONFIG } from '../components/input';
import { ICON_MATERIAL_CONFIG } from '../components/icon/configs/icon-material.config';
import { BUTTON_MATERIAL_CONFIG } from '../components/button';

export const MATERIAL_CONFIG: Readonly<BlizzConfigComponentsDictionary> = {
  chip: CHIPS_MATERIAL_CONFIG,
  input: INPUT_MATERIAL_CONFIG,
  icon: ICON_MATERIAL_CONFIG,
  button: BUTTON_MATERIAL_CONFIG,
  // iconButton: ICON_BUTTON_MATERIAL_CONFIG,
};
