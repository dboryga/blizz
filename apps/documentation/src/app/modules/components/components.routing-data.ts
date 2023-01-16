import { Route } from '@angular/router';
import { BUTTON_DATA } from './views/button/button.routing-data';
import { TABLE_DATA } from './views/table/table.routing-data';
import { CHIPS_DATA } from './views/chips/chips.routing-data';

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
  CHIPS_DATA,
  TABLE_DATA,
];
