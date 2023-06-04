import { Route } from '@angular/router';
import { getTitle } from '../../shared';
import { ModuleRoutesEnum } from '../../app.routing-data';
import { CUSTOMIZER_PARAMS, CUSTOMIZER_SETTINGS_GROUPS } from './customizer.routing-data';

export const CUSTOMIZER_ROUTING: Route = {
  path: `${ModuleRoutesEnum.Customizer}/:${CUSTOMIZER_PARAMS.Component}`,
  pathMatch: 'prefix',
  title: getTitle('Customizer'),
  data: { label: 'Customizer' },
  loadComponent: () => import('./customizer.view').then((c) => c.DocCustomizerView),
  children: [
    {
      path: `:${CUSTOMIZER_PARAMS.SettingsGroup}`,
      children: [],
    },
    { path: '**', redirectTo: CUSTOMIZER_SETTINGS_GROUPS.Elements },
  ],
};
