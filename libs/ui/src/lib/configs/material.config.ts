import { BlizzConfigComponentsDictionary } from '../models';
import { ACCORDION_MATERIAL_CONFIG } from '../components/accordion';
import { BUTTON_MATERIAL_CONFIG } from '../components/button';
import { CHIPS_MATERIAL_CONFIG } from '../components/chip';
import { EXPANSION_PANEL_MATERIAL_CONFIG } from '../components/expansion-panel';
import { ICON_BUTTON_MATERIAL_CONFIG } from '../components/icon-button';
import { ICON_MATERIAL_CONFIG } from '../components/icon';
import { TEXT_FIELD_MATERIAL_CONFIG } from '../components/text-field';
import { SELECT_MATERIAL_CONFIG } from '../components/select';

export const MATERIAL_CONFIG: Readonly<BlizzConfigComponentsDictionary> = {
  accordion: ACCORDION_MATERIAL_CONFIG,
  button: BUTTON_MATERIAL_CONFIG,
  chip: CHIPS_MATERIAL_CONFIG,
  expansionPanel: EXPANSION_PANEL_MATERIAL_CONFIG,
  icon: ICON_MATERIAL_CONFIG,
  iconButton: ICON_BUTTON_MATERIAL_CONFIG,
  textField: TEXT_FIELD_MATERIAL_CONFIG,
  select: SELECT_MATERIAL_CONFIG,
};
