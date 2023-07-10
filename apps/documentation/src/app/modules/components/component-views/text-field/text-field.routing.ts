import { COMPONENT_PAGES, DefaultComponentPage } from '../../models/component-page.model';
import { DocTextFieldOverviewView } from './overview/text-field-overview.view';
import { DocTextFieldApiView } from './api/text-field-api.view';
import { DocTextFieldExamplesView } from './examples/text-field-examples.view';
import { getTitle } from '../../../../shared';
import { TEXT_FIELD_DATA } from './text-field.routing-data';
import { ComponentRoute } from '../../components.routing-data';
import { DocComponentsComponentConfigView } from '../../views/component-config/component-config.view';

export const TEXT_FIELD_ROUTING: ComponentRoute = {
  data: TEXT_FIELD_DATA,
  path: TEXT_FIELD_DATA.path,
  title: getTitle(TEXT_FIELD_DATA.label),
  loadComponent: () => import('./text-field.view').then((c) => c.DocTextFieldView),
  children: [
    { path: COMPONENT_PAGES.Overview, component: DocTextFieldOverviewView },
    { path: COMPONENT_PAGES.Api, component: DocTextFieldApiView },
    { path: COMPONENT_PAGES.Examples, component: DocTextFieldExamplesView },
    { path: COMPONENT_PAGES.Config, component: DocComponentsComponentConfigView },
    { path: '**', redirectTo: DefaultComponentPage },
  ],
};
