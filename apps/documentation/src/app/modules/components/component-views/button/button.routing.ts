import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocButtonOverviewView } from './overview/button-overview.view';
import { DocButtonApiView } from './api/button-api.view';
import { DocButtonExamplesView } from './examples/button-examples.view';
import { getTitle } from '../../../../shared';
import { BUTTON_DATA } from './button.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const BUTTON_ROUTING: ComponentRoute = {
  data: BUTTON_DATA,
  path: BUTTON_DATA.path,
  title: getTitle(BUTTON_DATA.label),
  loadComponent: () => import('./button.view').then((c) => c.DocButtonView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocButtonOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocButtonApiView },
    { path: COMPONENT_PAGES.Examples, component: DocButtonExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
