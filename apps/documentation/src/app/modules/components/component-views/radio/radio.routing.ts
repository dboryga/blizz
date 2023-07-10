import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocRadioOverviewView } from './overview/radio-overview.view';
import { DocRadioApiView } from './api/radio-api.view';
import { DocRadioExamplesView } from './examples/radio-examples.view';
import { getTitle } from '../../../../shared';
import { RADIO_DATA } from './radio.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const RADIO_ROUTING: ComponentRoute = {
  data: RADIO_DATA,
  path: RADIO_DATA.path,
  title: getTitle(RADIO_DATA.label),
  loadComponent: () => import('./radio.view').then((c) => c.DocRadioView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocRadioOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocRadioApiView },
    { path: COMPONENT_PAGES.Examples, component: DocRadioExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
