import { ComponentPages, DefaultComponentPage } from '../../models/component-page';
import { DocChipsOverviewView } from './overview/chips-overview.view';
import { DocChipsApiView } from './api/chips-api.view';
import { DocChipsExamplesView } from './examples/chips-examples.view';
import { getTitle } from '../../../../shared';
import { ComponentRoute } from '../../components.routing-data';
import { CHIPS_DATA } from './chips.routing-data';

export const CHIPS_ROUTING: ComponentRoute = {
  data: CHIPS_DATA,
  path: CHIPS_DATA.path,
  title: getTitle(CHIPS_DATA.label),
  loadComponent: () => import('./chips.view').then((c) => c.DocChipsView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocChipsOverviewView },
    { path: ComponentPages.API, component: DocChipsApiView },
    { path: ComponentPages.EXAMPLES, component: DocChipsExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
