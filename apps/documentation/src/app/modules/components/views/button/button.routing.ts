import { ComponentPages, DefaultComponentPage } from '../../models/component-page';
import { DocButtonOverviewView } from './overview/button-overview.view';
import { DocButtonApiView } from './api/button-api.view';
import { DocButtonExamplesView } from './examples/button-examples.view';
import { getTitle } from '../../../../shared';
import { BUTTON_DATA } from './button.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const BUTTON_ROUTING: ComponentRoute = {
  data: BUTTON_DATA,
  path: BUTTON_DATA.path,
  title: getTitle(BUTTON_DATA.label),
  loadComponent: () => import('./button.view').then((c) => c.DocButtonView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocButtonOverviewView },
    { path: ComponentPages.API, component: DocButtonApiView },
    { path: ComponentPages.EXAMPLES, component: DocButtonExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
