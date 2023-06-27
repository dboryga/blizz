import { BlizzConfigComponentsDictionary } from '../models';
import { CHIP_BLIZZ_UI_CONFIG } from '../components/chip';
import { INPUT_BLIZZ_UI_CONFIG } from '../components/input';
import { ICON_BLIZZ_UI_CONFIG } from '../components/icon/configs/icon-blizz-ui.config';
import { BUTTON_BLIZZ_UI_CONFIG } from '../components/button/configs';

export const BLIZZ_UI_CONFIG: Readonly<BlizzConfigComponentsDictionary> = {
  chip: CHIP_BLIZZ_UI_CONFIG,
  input: INPUT_BLIZZ_UI_CONFIG,
  icon: ICON_BLIZZ_UI_CONFIG,
  button: BUTTON_BLIZZ_UI_CONFIG,
  // iconButton: ICON_BUTTON_BLIZZ_UI_CONFIG,
};
