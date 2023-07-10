import { BlizzConfigComponentsDictionary } from '../models';
import { ACCORDION_BLIZZ_UI_CONFIG } from '../components/accordion';
import { BUTTON_BLIZZ_UI_CONFIG } from '../components/button/configs';
import { CHIP_BLIZZ_UI_CONFIG } from '../components/chip';
import { EXPANSION_PANEL_BLIZZ_UI_CONFIG } from '../components/expansion-panel';
import { ICON_BLIZZ_UI_CONFIG } from '../components/icon';
import { ICON_BUTTON_BLIZZ_UI_CONFIG } from '../components/icon-button';
import { TEXT_FIELD_BLIZZ_UI_CONFIG } from '../components/text-field';
import { SELECT_BLIZZ_UI_CONFIG } from '../components/select';

export const BLIZZ_UI_CONFIG: Readonly<BlizzConfigComponentsDictionary> = {
  accordion: ACCORDION_BLIZZ_UI_CONFIG,
  button: BUTTON_BLIZZ_UI_CONFIG,
  chip: CHIP_BLIZZ_UI_CONFIG,
  expansionPanel: EXPANSION_PANEL_BLIZZ_UI_CONFIG,
  icon: ICON_BLIZZ_UI_CONFIG,
  iconButton: ICON_BUTTON_BLIZZ_UI_CONFIG,
  textField: TEXT_FIELD_BLIZZ_UI_CONFIG,
  select: SELECT_BLIZZ_UI_CONFIG,
};
