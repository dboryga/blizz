import { ComponentPages, DefaultComponentPage } from '../../models/component-page.model';
import { DocIconButtonOverviewView } from './overview/icon-button-overview.view';
import { DocIconButtonApiView } from './api/icon-button-api.view';
import { DocIconButtonExamplesView } from './examples/icon-button-examples.view';
import { getTitle } from '../../../../shared';
import { ICON_BUTTON_DATA } from './icon-button.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const ICON_BUTTON_ROUTING: ComponentRoute = {
  data: ICON_BUTTON_DATA,
  path: ICON_BUTTON_DATA.path,
  title: getTitle(ICON_BUTTON_DATA.label),
  loadComponent: () => import('./icon-button.view').then((c) => c.DocIconButtonView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocIconButtonOverviewView },
    { path: ComponentPages.API, component: DocIconButtonApiView },
    { path: ComponentPages.EXAMPLES, component: DocIconButtonExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
