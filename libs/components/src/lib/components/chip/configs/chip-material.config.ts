import { BlizzConfigChip } from '../chip-config.interface';
import { theme } from '../../../utils';

export const CHIPS_MATERIAL_CONFIG: Readonly<BlizzConfigChip> = {
  elements: {
    body: {
      styles: {
        padding: '0.5rem 1rem',
        gap: '0.5rem',
        border: {
          radius: '0.5rem',
          width: '1px',
          color: theme('neutral'),
        },
        text: {
          height: '1',
          weight: '500',
          letterSpacing: '0.5px',
        },
      },
    },
    prefix: {
      styles: {
        margin: '0 0 0 -0.5rem',
      },
    },
    suffix: {
      styles: {
        margin: '0 -0.5rem 0 0',
      },
    },
  },
  states: {
    hover: {
      body: {
        styles: {
          bgColor: 'rgba(0, 0, 0, .05)',
        },
      },
    },
    selectable: {
      body: {
        styles: {
          cursor: 'pointer',
        },
      },
    },
    selected: {
      body: {
        styles: {
          bgColor: theme('primary'),
          text: {
            color: theme('white'),
          },
          border: {
            width: '0',
          },
        },
      },
    },
    disabled: {
      body: {
        styles: {
          cursor: 'default',
          bgColor: theme('neutral-200'),
          text: {
            color: theme('neutral-400'),
          },
          border: {
            color: theme('neutral-200'),
          },
        },
      },
    },
  },
  variations: {},
};
