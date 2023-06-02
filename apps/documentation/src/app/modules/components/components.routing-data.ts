import { Route } from '@angular/router';
import { BUTTON_DATA } from './views/button/button.routing-data';
import { TABLE_DATA } from './views/table/table.routing-data';
import { CHIPS_DATA } from './views/chips/chips.routing-data';
import { CHECKBOX_DATA } from './views/checkbox/checkbox.routing-data';
import { INPUT_DATA } from './views/input/input.routing-data';
import { RADIO_DATA } from './views/radio/radio.routing-data';
import { SELECT_DATA } from './views/select/select.routing-data';
import { SLIDER_DATA } from './views/slider/slider.routing-data';

export interface DocComponentData {
  path: string;
  label: string;
  iconSrc: string;
}

export interface ComponentRoute extends Route {
  data: DocComponentData;
}

export const COMPONENTS_DATA: DocComponentData[] = [
  BUTTON_DATA,
  CHECKBOX_DATA,
  CHIPS_DATA,
  INPUT_DATA,
  RADIO_DATA,
  SELECT_DATA,
  SLIDER_DATA,
  TABLE_DATA,
];
