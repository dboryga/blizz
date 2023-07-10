import { Routes } from '@angular/router';
import { COMPONENTS_ROUTING } from './modules/components/components.routing';
import { getTitle } from './shared';
import { CUSTOMIZER_ROUTING } from './modules/customizer/customizer.routing';
import { ModuleRoutesEnum } from './app.routing-data';
import { INSTALLATION_ROUTING } from './modules/installation/installation.routing';

export const APP_ROUTING: Routes = [
  INSTALLATION_ROUTING,
  COMPONENTS_ROUTING,
  CUSTOMIZER_ROUTING,
  { path: '', title: '', pathMatch: 'full', redirectTo: 'components' },
  // Mock routes
  // {
  //   path: ModuleRoutesEnum.Cdk,
  //   title: getTitle('CDK'),
  //   data: { label: 'CDK' },
  //   children: [],
  // },
  // {
  //   path: ModuleRoutesEnum.Animations,
  //   title: getTitle('Animations'),
  //   data: { label: 'Animations' },
  //   children: [],
  // },
  // {
  //   path: ModuleRoutesEnum.Profile,
  //   title: getTitle('Profile'),
  //   data: { label: 'Profile' },
  //   children: [],
  // },
];
