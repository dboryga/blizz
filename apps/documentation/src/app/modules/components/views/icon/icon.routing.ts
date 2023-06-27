import { ComponentPages, DefaultComponentPage } from '../../models/component-page.model';
import { DocIconOverviewView } from './overview/icon-overview.view';
import { DocIconApiView } from './api/icon-api.view';
import { DocIconExamplesView } from './examples/icon-examples.view';
import { getTitle } from '../../../../shared';
import { ICON_DATA } from './icon.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const ICON_ROUTING: ComponentRoute = {
  data: ICON_DATA,
  path: ICON_DATA.path,
  title: getTitle(ICON_DATA.label),
  loadComponent: () => import('./icon.view').then((c) => c.DocIconView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocIconOverviewView },
    { path: ComponentPages.API, component: DocIconApiView },
    { path: ComponentPages.EXAMPLES, component: DocIconExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
