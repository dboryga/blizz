import {
  ComponentPages,
  DefaultComponentPage,
} from '../../models/component-page';
import { DocTableOverviewView } from './overview/table-overview.view';
import { DocTableApiView } from './api/table-api.view';
import { DocTableExamplesView } from './examples/table-examples.view';
import { getTitle } from '../../../../shared';
import { TABLE_DATA } from './table.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const TABLE_ROUTING: ComponentRoute = {
  data: TABLE_DATA,
  path: TABLE_DATA.path,
  title: getTitle(TABLE_DATA.label),
  loadComponent: () => import('./table.view').then((c) => c.DocTableView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocTableOverviewView },
    { path: ComponentPages.API, component: DocTableApiView },
    { path: ComponentPages.EXAMPLES, component: DocTableExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
