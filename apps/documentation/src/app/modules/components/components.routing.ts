import { Route } from '@angular/router';
import { getTitle } from '../../shared';
import { ModuleRoutesEnum } from '../../app.routing-data';
import { DocComponentsHomeView } from './views/components-home/components-home.view';
import { DocComponentsComponentConfigView } from './views/component-config/component-config.view';
import { BUTTON_ROUTING } from './component-views/button/button.routing';
import { CHIP_ROUTING } from './component-views/chip/chip.routing';
import { TABLE_ROUTING } from './component-views/table/table.routing';
import { CHECKBOX_ROUTING } from './component-views/checkbox/checkbox.routing';
import { RADIO_ROUTING } from './component-views/radio/radio.routing';
import { SELECT_ROUTING } from './component-views/select/select.routing';
import { SLIDER_ROUTING } from './component-views/slider/slider.routing';
import { ICON_BUTTON_ROUTING } from './component-views/icon-button/icon-button.routing';
import { ICON_ROUTING } from './component-views/icon/icon.routing';
import { EXPANSION_PANEL_ROUTING } from './component-views/expansion-panel/expansion-panel.routing';
import { ACCORDION_ROUTING } from './component-views/accordion/accordion.routing';
import { TEXT_FIELD_ROUTING } from './component-views/text-field/text-field.routing';

export const COMPONENTS_ROUTING: Route = {
  children: [
    ACCORDION_ROUTING,
    BUTTON_ROUTING,
    CHECKBOX_ROUTING,
    CHIP_ROUTING,
    EXPANSION_PANEL_ROUTING,
    ICON_BUTTON_ROUTING,
    ICON_ROUTING,
    TEXT_FIELD_ROUTING,
    RADIO_ROUTING,
    SELECT_ROUTING,
    SLIDER_ROUTING,
    TABLE_ROUTING,
    { path: '', pathMatch: 'full', component: DocComponentsHomeView },
    { path: '**', redirectTo: '' },
  ],
  loadComponent: () => import('./components.view').then((c) => c.DocComponentsView),
  path: ModuleRoutesEnum.Components,
  title: getTitle('Components'),
};
