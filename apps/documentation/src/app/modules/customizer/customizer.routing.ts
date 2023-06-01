import { Route } from '@angular/router';
import { getTitle } from '../../shared';
import { ModuleRoutesEnum } from '../../app.routing-data';
import { CustomizerParams, CustomizerSettingsGroups } from './customizer.routing-data';

export const CUSTOMIZER_ROUTING: Route = {
  path: `${ModuleRoutesEnum.Customizer}/:${CustomizerParams.Component}`,
  pathMatch: 'prefix',
  title: getTitle('Customizer'),
  data: { label: 'Customizer' },
  loadComponent: () => import('./customizer.view').then((c) => c.DocCustomizerView),
  children: [
    {
      path: `:${CustomizerParams.SettingsGroup}`,
      children: [],
    },
    { path: '**', redirectTo: CustomizerSettingsGroups.General },
  ],
};
