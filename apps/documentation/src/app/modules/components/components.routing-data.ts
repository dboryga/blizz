import { Route } from '@angular/router';
import { BUTTON_DATA } from './component-views/button/button.routing-data';
import { CHIP_DATA } from './component-views/chip/chip.routing-data';
import { CHECKBOX_DATA } from './component-views/checkbox/checkbox.routing-data';
import { RADIO_DATA } from './component-views/radio/radio.routing-data';
import { SELECT_DATA } from './component-views/select/select.routing-data';
import { ICON_DATA } from './component-views/icon/icon.routing-data';
import { ICON_BUTTON_DATA } from './component-views/icon-button/icon-button.routing-data';
import { EXPANSION_PANEL_DATA } from './component-views/expansion-panel/expansion-panel.routing-data';
import { ACCORDION_DATA } from './component-views/accordion/accordion.routing-data';
import { TEXT_FIELD_DATA } from './component-views/text-field/text-field.routing-data';

export interface DocComponentData {
  path: string;
  label: string;
  iconSrc: string;
}

export interface ComponentRoute extends Route {
  data: DocComponentData;
}

export const COMPONENTS_DATA: DocComponentData[] = [
  // CHECKBOX_DATA,
  // RADIO_DATA,
  // SLIDER_DATA,
  // TABLE_DATA,
  ACCORDION_DATA,
  BUTTON_DATA,
  CHIP_DATA,
  EXPANSION_PANEL_DATA,
  ICON_BUTTON_DATA,
  ICON_DATA,
  SELECT_DATA,
  TEXT_FIELD_DATA,
];
