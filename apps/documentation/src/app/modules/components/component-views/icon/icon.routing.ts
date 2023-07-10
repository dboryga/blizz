import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocIconOverviewView } from './overview/icon-overview.view';
import { DocIconApiView } from './api/icon-api.view';
import { DocIconExamplesView } from './examples/icon-examples.view';
import { getTitle } from '../../../../shared';
import { ICON_DATA } from './icon.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const ICON_ROUTING: ComponentRoute = {
  data: ICON_DATA,
  path: ICON_DATA.path,
  title: getTitle(ICON_DATA.label),
  loadComponent: () => import('./icon.view').then((c) => c.DocIconView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocIconOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocIconApiView },
    { path: COMPONENT_PAGES.Examples, component: DocIconExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
