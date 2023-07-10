import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocTableOverviewView } from './overview/table-overview.view';
import { DocTableApiView } from './api/table-api.view';
import { DocTableExamplesView } from './examples/table-examples.view';
import { getTitle } from '../../../../shared';
import { TABLE_DATA } from './table.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const TABLE_ROUTING: ComponentRoute = {
  data: TABLE_DATA,
  path: TABLE_DATA.path,
  title: getTitle(TABLE_DATA.label),
  loadComponent: () => import('./table.view').then((c) => c.DocTableView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocTableOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocTableApiView },
    { path: COMPONENT_PAGES.Examples, component: DocTableExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
