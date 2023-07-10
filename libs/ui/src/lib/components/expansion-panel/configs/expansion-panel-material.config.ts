import { BlizzConfigExpansionPanel } from '../expansion-panel-config.interface';
import { BLIZZ_HOST_ELEMENT_KEY } from '../../../models';
import { theme } from '../../../utils';

export const EXPANSION_PANEL_MATERIAL_CONFIG: Readonly<BlizzConfigExpansionPanel> = {
  elements: {
    [BLIZZ_HOST_ELEMENT_KEY]: {
      styles: {
        shadow: '0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f',
        bgColor: theme('white'),
      },
    },
    content: {
      styles: {
        padding: '0 1.5rem 1rem',
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
          weight: 'bold',
          size: '0.875rem',
        },
        height: {
          min: '3rem',
        },
        padding: '0 1.5rem',
      },
    },
  },
  states: {
    triggerHover: {
      trigger: {
        styles: {
          bgColor: theme('neutral-100'),
        },
      },
    },
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
          bgColor: theme('white'),
        },
      },
      [BLIZZ_HOST_ELEMENT_KEY]: {
        styles: {
          margin: '1rem 0',
        },
      },
    },
  },
  variations: {},
};
