import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocSliderOverviewView } from './overview/slider-overview.view';
import { DocSliderApiView } from './api/slider-api.view';
import { DocSliderExamplesView } from './examples/slider-examples.view';
import { getTitle } from '../../../../shared';
import { SLIDER_DATA } from './slider.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const SLIDER_ROUTING: ComponentRoute = {
  data: SLIDER_DATA,
  path: SLIDER_DATA.path,
  title: getTitle(SLIDER_DATA.label),
  loadComponent: () => import('./slider.view').then((c) => c.DocSliderView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocSliderOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocSliderApiView },
    { path: COMPONENT_PAGES.Examples, component: DocSliderExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
