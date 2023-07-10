import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocSelectOverviewView } from './overview/select-overview.view';
import { DocSelectApiView } from './api/select-api.view';
import { DocSelectExamplesView } from './examples/select-examples.view';
import { getTitle } from '../../../../shared';
import { SELECT_DATA } from './select.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const SELECT_ROUTING: ComponentRoute = {
  data: SELECT_DATA,
  path: SELECT_DATA.path,
  title: getTitle(SELECT_DATA.label),
  loadComponent: () => import('./select.view').then((c) => c.DocSelectView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocSelectOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocSelectApiView },
    { path: COMPONENT_PAGES.Examples, component: DocSelectExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
