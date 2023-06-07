import { ComponentPages, DefaultComponentPage } from '../../models/component-page.model';
import { DocSliderOverviewView } from './overview/slider-overview.view';
import { DocSliderApiView } from './api/slider-api.view';
import { DocSliderExamplesView } from './examples/slider-examples.view';
import { getTitle } from '../../../../shared';
import { SLIDER_DATA } from './slider.routing-data';
import { ComponentRoute } from '../../components.routing-data';

export const SLIDER_ROUTING: ComponentRoute = {
  data: SLIDER_DATA,
  path: SLIDER_DATA.path,
  title: getTitle(SLIDER_DATA.label),
  loadComponent: () => import('./slider.view').then((c) => c.DocSliderView),
  children: [
    { path: ComponentPages.OVERVIEW, component: DocSliderOverviewView },
    { path: ComponentPages.API, component: DocSliderApiView },
    { path: ComponentPages.EXAMPLES, component: DocSliderExamplesView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
