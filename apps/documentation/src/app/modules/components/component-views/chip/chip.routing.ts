import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocChipOverviewView } from './overview/chip-overview.view';
import { DocChipApiView } from './api/chip-api.view';
import { DocChipExamplesView } from './examples/chip-examples.view';
import { getTitle } from '../../../../shared';
import { ComponentRoute } from '../../components.routing-data';
import { CHIP_DATA } from './chip.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const CHIP_ROUTING: ComponentRoute = {
  data: CHIP_DATA,
  path: CHIP_DATA.path,
  title: getTitle(CHIP_DATA.label),
  loadComponent: () => import('./chip.view').then((c) => c.DocChipView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocChipOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocChipApiView },
    { path: COMPONENT_PAGES.Examples, component: DocChipExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
