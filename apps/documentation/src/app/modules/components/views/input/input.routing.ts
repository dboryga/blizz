import { ComponentPages, DefaultComponentPage } from '../../models/component-page';
import { DocInputOverviewView } from './overview/input-overview.view';
import { DocInputApiView } from './api/input-api.view';
import { DocInputExamplesView } from './examples/input-examples.view';
import { getTitle } from '../../../../shared';
import { INPUT_DATA } from './input.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const INPUT_ROUTING: ComponentRoute = {
  data: INPUT_DATA,
  path: INPUT_DATA.path,
  title: getTitle(INPUT_DATA.label),
  loadComponent: () => import('./input.view').then((c) => c.DocInputView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocInputOverviewView },
    { path: ComponentPages.API, component: DocInputApiView },
    { path: ComponentPages.EXAMPLES, component: DocInputExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
