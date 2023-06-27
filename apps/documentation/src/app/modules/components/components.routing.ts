import { Route } from '@angular/router';
import { ComponentsHomeView } from './components-home.view';
import { getTitle } from '../../shared';
import { ModuleRoutesEnum } from '../../app.routing-data';
import { BUTTON_ROUTING } from './views/button/button.routing';
import { CHIP_ROUTING } from './views/chip/chip.routing';
import { TABLE_ROUTING } from './views/table/table.routing';
import { CHECKBOX_ROUTING } from './views/checkbox/checkbox.routing';
import { INPUT_ROUTING } from './views/input/input.routing';
import { RADIO_ROUTING } from './views/radio/radio.routing';
import { SELECT_ROUTING } from './views/select/select.routing';
import { SLIDER_ROUTING } from './views/slider/slider.routing';
import { ICON_BUTTON_ROUTING } from './views/icon-button/icon-button.routing';
import { ICON_ROUTING } from './views/icon/icon.routing';

export const COMPONENTS_ROUTING: Route = {
  path: ModuleRoutesEnum.Components,
  title: getTitle('Components'),
  loadComponent: () => import('./components.view').then((c) => c.DocComponentsView),
  children: [
    BUTTON_ROUTING,
    CHECKBOX_ROUTING,
    CHIP_ROUTING,
    INPUT_ROUTING,
    RADIO_ROUTING,
    SELECT_ROUTING,
    SLIDER_ROUTING,
    ICON_ROUTING,
    ICON_BUTTON_ROUTING,
    TABLE_ROUTING,
    { path: '', pathMatch: 'full', component: ComponentsHomeView },
    { path: '**', redirectTo: '' },
  ],
};
