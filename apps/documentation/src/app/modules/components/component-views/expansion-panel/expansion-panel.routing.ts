import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocExpansionPanelOverviewView } from './overview/expansion-panel-overview.view';
import { DocExpansionPanelApiView } from './api/expansion-panel-api.view';
import { DocExpansionPanelExamplesView } from './examples/expansion-panel-examples.view';
import { getTitle } from '../../../../shared';
import { EXPANSION_PANEL_DATA } from './expansion-panel.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const EXPANSION_PANEL_ROUTING: ComponentRoute = {
  data: EXPANSION_PANEL_DATA,
  path: EXPANSION_PANEL_DATA.path,
  title: getTitle(EXPANSION_PANEL_DATA.label),
  loadComponent: () => import('./expansion-panel.view').then((c) => c.DocExpansionPanelView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocExpansionPanelOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocExpansionPanelApiView },
    { path: COMPONENT_PAGES.Examples, component: DocExpansionPanelExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
