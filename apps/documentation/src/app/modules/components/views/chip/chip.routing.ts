import { ComponentPages, DefaultComponentPage } from '../../models/component-page.model';
import { DocChipOverviewView } from './overview/chip-overview.view';
import { DocChipApiView } from './api/chip-api.view';
import { DocChipExamplesView } from './examples/chip-examples.view';
import { getTitle } from '../../../../shared';
import { ComponentRoute } from '../../components.routing-data';
import { CHIP_DATA } from './chip.routing-data';

export const CHIP_ROUTING: ComponentRoute = {
  data: CHIP_DATA,
  path: CHIP_DATA.path,
  title: getTitle(CHIP_DATA.label),
  loadComponent: () => import('./chip.view').then((c) => c.DocChipView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocChipOverviewView },
    { path: ComponentPages.API, component: DocChipApiView },
    { path: ComponentPages.EXAMPLES, component: DocChipExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
