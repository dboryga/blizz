import { ComponentPages, DefaultComponentPage } from '../../models/component-page.model';
import { DocSelectOverviewView } from './overview/select-overview.view';
import { DocSelectApiView } from './api/select-api.view';
import { DocSelectExamplesView } from './examples/select-examples.view';
import { getTitle } from '../../../../shared';
import { SELECT_DATA } from './select.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const SELECT_ROUTING: ComponentRoute = {
  data: SELECT_DATA,
  path: SELECT_DATA.path,
  title: getTitle(SELECT_DATA.label),
  loadComponent: () => import('./select.view').then((c) => c.DocSelectView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocSelectOverviewView },
    { path: ComponentPages.API, component: DocSelectApiView },
    { path: ComponentPages.EXAMPLES, component: DocSelectExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
