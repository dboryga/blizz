import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocIconButtonOverviewView } from './overview/icon-button-overview.view';
import { DocIconButtonApiView } from './api/icon-button-api.view';
import { DocIconButtonExamplesView } from './examples/icon-button-examples.view';
import { getTitle } from '../../../../shared';
import { ICON_BUTTON_DATA } from './icon-button.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const ICON_BUTTON_ROUTING: ComponentRoute = {
  data: ICON_BUTTON_DATA,
  path: ICON_BUTTON_DATA.path,
  title: getTitle(ICON_BUTTON_DATA.label),
  loadComponent: () => import('./icon-button.view').then((c) => c.DocIconButtonView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocIconButtonOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocIconButtonApiView },
    { path: COMPONENT_PAGES.Examples, component: DocIconButtonExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
