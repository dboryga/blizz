import { ComponentPages, DefaultComponentPage } from '../../models/component-page';
import { DocCheckboxOverviewView } from './overview/checkbox-overview.view';
import { DocCheckboxApiView } from './api/checkbox-api.view';
import { DocCheckboxExamplesView } from './examples/checkbox-examples.view';
import { getTitle } from '../../../../shared';
import { CHECKBOX_DATA } from './checkbox.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const CHECKBOX_ROUTING: ComponentRoute = {
  data: CHECKBOX_DATA,
  path: CHECKBOX_DATA.path,
  title: getTitle(CHECKBOX_DATA.label),
  loadComponent: () => import('./checkbox.view').then((c) => c.DocCheckboxView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocCheckboxOverviewView },
    { path: ComponentPages.API, component: DocCheckboxApiView },
    { path: ComponentPages.EXAMPLES, component: DocCheckboxExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
