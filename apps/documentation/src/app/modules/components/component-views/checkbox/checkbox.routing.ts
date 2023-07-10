import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocCheckboxOverviewView } from './overview/checkbox-overview.view';
import { DocCheckboxApiView } from './api/checkbox-api.view';
import { DocCheckboxExamplesView } from './examples/checkbox-examples.view';
import { getTitle } from '../../../../shared';
import { CHECKBOX_DATA } from './checkbox.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const CHECKBOX_ROUTING: ComponentRoute = {
  data: CHECKBOX_DATA,
  path: CHECKBOX_DATA.path,
  title: getTitle(CHECKBOX_DATA.label),
  loadComponent: () => import('./checkbox.view').then((c) => c.DocCheckboxView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocCheckboxOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocCheckboxApiView },
    { path: COMPONENT_PAGES.Examples, component: DocCheckboxExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
