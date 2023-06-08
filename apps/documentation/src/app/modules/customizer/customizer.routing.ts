import { Route } from '@angular/router';
import { getTitle } from '../../shared';
import { ModuleRoutesEnum } from '../../app.routing-data';
import { CUSTOMIZER_PARAM, CUSTOMIZER_SETTINGS_GROUP } from './customizer.routing-data';
import { DocCustomizerElementsView } from './views/elements/elements.view';
import { DocCustomizerConfigView } from './views/config/config.view';
import { DocCustomizerSnippetView } from './views/snippet/snippet.view';
import { DocCustomizerVariationsView } from './views/variations/variations.view';
import { DocCustomizerInteractionsView } from './views/interactions/interactions.view';
import { DocCustomizerAnimationsView } from './views/animations/animations.view';
import { DocCustomizerStatesView } from './views/states/states.view';

export const CUSTOMIZER_ROUTING: Route = {
  path: `${ModuleRoutesEnum.Customizer}/:${CUSTOMIZER_PARAM.Component}`,
  pathMatch: 'prefix',
  title: getTitle('Customizer'),
  data: { label: 'Customizer' },
  loadComponent: () => import('./customizer.view').then((c) => c.DocCustomizerView),
  children: [
    {
      path: CUSTOMIZER_SETTINGS_GROUP.Elements,
      component: DocCustomizerElementsView,
    },
    {
      path: CUSTOMIZER_SETTINGS_GROUP.States,
      component: DocCustomizerStatesView,
    },
    {
      path: CUSTOMIZER_SETTINGS_GROUP.Variations,
      component: DocCustomizerVariationsView,
    },
    {
      path: CUSTOMIZER_SETTINGS_GROUP.Interactions,
      component: DocCustomizerInteractionsView,
    },
    {
      path: CUSTOMIZER_SETTINGS_GROUP.Animations,
      component: DocCustomizerAnimationsView,
    },
    {
      path: CUSTOMIZER_SETTINGS_GROUP.Snippet,
      component: DocCustomizerSnippetView,
    },
    {
      path: CUSTOMIZER_SETTINGS_GROUP.Config,
      component: DocCustomizerConfigView,
    },
    { path: '**', redirectTo: CUSTOMIZER_SETTINGS_GROUP.Elements },
  ],
};
