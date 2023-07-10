import { Route } from '@angular/router';
import { getTitle } from '../../shared';
import { ModuleRoutesEnum } from '../../app.routing-data';
import { CustomizerParam, CustomizerSettingsGroup } from './customizer.routing-data';
import { DocCustomizerElementsView } from './views/elements/elements.view';
import { DocCustomizerConfigView } from './views/config/config.view';
import { DocCustomizerSnippetView } from './views/snippet/snippet.view';
import { DocCustomizerVariationsView } from './views/variations/variations.view';
import { DocCustomizerStatesView } from './views/states/states.view';
import { DocCustomizerGeneralView } from './views/general/general.view';

export const CUSTOMIZER_ROUTING: Route = {
  path: `${ModuleRoutesEnum.Customizer}/:${CustomizerParam.Component}`,
  pathMatch: 'prefix',
  title: getTitle('Customizer'),
  data: { label: 'Customizer' },
  loadComponent: () => import('./customizer.view').then((c) => c.DocCustomizerView),
  children: [
    {
      path: CustomizerSettingsGroup.General,
      component: DocCustomizerGeneralView,
    },
    {
      path: CustomizerSettingsGroup.Elements,
      component: DocCustomizerElementsView,
    },
    {
      path: CustomizerSettingsGroup.States,
      component: DocCustomizerStatesView,
      children: [
        {
          path: `:${CustomizerParam.State}`,
          children: [],
        },
      ],
    },
    {
      path: CustomizerSettingsGroup.Variations,
      component: DocCustomizerVariationsView,
      children: [
        {
          path: `:${CustomizerParam.Variation}`,
          children: [],
        },
        {
          path: `:${CustomizerParam.Variation}/:${CustomizerParam.State}`,
          children: [],
        },
      ],
    },
    // {
    //   path: CustomizerSettingsGroup.Interactions,
    //   component: DocCustomizerInteractionsView,
    // },
    // {
    //   path: CustomizerSettingsGroup.Animations,
    //   component: DocCustomizerAnimationsView,
    // },
    // {
    //   path: CustomizerSettingsGroup.Snippet,
    //   component: DocCustomizerSnippetView,
    // },
    {
      path: CustomizerSettingsGroup.Config,
      component: DocCustomizerConfigView,
    },
    { path: '**', redirectTo: CustomizerSettingsGroup.General },
  ],
};
