import { Route } from '@angular/router';
import { ComponentsHomeView } from './components-home.view';
import { getTitle } from '../../shared';
import { ModuleRoutesEnum } from '../../app.routing-data';
import { BUTTON_ROUTING } from './views/button/button.routing';
import { CHIPS_ROUTING } from './views/chips/chips.routing';
import { TABLE_ROUTING } from './views/table/table.routing';

export const COMPONENTS_ROUTING: Route = {
  path: ModuleRoutesEnum.Components,
  title: getTitle('Components'),
  loadComponent: () =>
    import('./components.view').then((c) => c.DocComponentsView),
  children: [
    BUTTON_ROUTING,
    CHIPS_ROUTING,
    TABLE_ROUTING,
    { path: '', pathMatch: 'full', component: ComponentsHomeView },
    { path: '**', redirectTo: '' },
  ],
};
