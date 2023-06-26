import { Route } from '@angular/router';
import { getTitle } from '../../shared';
import { ModuleRoutesEnum } from '../../app.routing-data';

export const INSTALLATION_ROUTING: Route = {
  path: ModuleRoutesEnum.Installation,
  title: getTitle('Installation'),
  loadComponent: () => import('./installation.view').then((c) => c.DocInstallationView),
};
