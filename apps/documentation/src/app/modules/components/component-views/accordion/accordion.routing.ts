import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocAccordionOverviewView } from './overview/accordion-overview.view';
import { DocAccordionApiView } from './api/accordion-api.view';
import { DocAccordionExamplesView } from './examples/accordion-examples.view';
import { getTitle } from '../../../../shared';
import { ACCORDION_DATA } from './accordion.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const ACCORDION_ROUTING: ComponentRoute = {
  data: ACCORDION_DATA,
  path: ACCORDION_DATA.path,
  title: getTitle(ACCORDION_DATA.label),
  loadComponent: () => import('./accordion.view').then((c) => c.DocAccordionView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocAccordionOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocAccordionApiView },
    { path: COMPONENT_PAGES.Examples, component: DocAccordionExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
