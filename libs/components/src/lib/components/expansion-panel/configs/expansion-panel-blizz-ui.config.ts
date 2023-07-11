import { BLIZZ_HOST_ELEMENT_KEY } from '../../../models';
import { BlizzConfigExpansionPanel } from '../expansion-panel-config.interface';
import { theme } from '../../../utils';

export const EXPANSION_PANEL_BLIZZ_UI_CONFIG: Readonly<BlizzConfigExpansionPanel> = {
  elements: {
    [BLIZZ_HOST_ELEMENT_KEY]: {
      styles: {
        padding: '0.25rem 1.25rem',
        bgColor: theme('white'),
        border: {
          width: '0 0 1px 0',
          color: theme('neutral-300'),
        },
      },
    },
    content: {
      styles: {
        padding: '0.5rem 0 1rem 0',
      },
    },
    defaultIndicator: {
      styles: {
        icon: 'expand_more',
        text: {
          color: theme('neutral-400'),
          weight: '300',
        },
      },
    },
    trigger: {
      styles: {
        text: {
          color: theme('neutral'),
        },
      },
    },
  },
  states: {
    expanded: {
      defaultIndicator: {
        styles: {
          transform: {
            rotate: '180deg',
          },
        },
      },
      trigger: {
        styles: {
          text: {
            color: theme('text'),
            weight: 'bold',
          },
        },
      },
    },
  },
  variations: {
    contrast: {
      states: {
        expanded: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('neutral-50'),
            },
          },
        },
      },
    },
  },
};
