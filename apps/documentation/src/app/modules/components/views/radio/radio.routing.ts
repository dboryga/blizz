import { ComponentPages, DefaultComponentPage } from '../../models/component-page';
import { DocRadioOverviewView } from './overview/radio-overview.view';
import { DocRadioApiView } from './api/radio-api.view';
import { DocRadioExamplesView } from './examples/radio-examples.view';
import { getTitle } from '../../../../shared';
import { RADIO_DATA } from './radio.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const RADIO_ROUTING: ComponentRoute = {
  data: RADIO_DATA,
  path: RADIO_DATA.path,
  title: getTitle(RADIO_DATA.label),
  loadComponent: () => import('./radio.view').then((c) => c.DocRadioView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocRadioOverviewView },
    { path: ComponentPages.API, component: DocRadioApiView },
    { path: ComponentPages.EXAMPLES, component: DocRadioExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
