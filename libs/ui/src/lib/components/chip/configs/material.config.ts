import { BlizzConfigChip } from '../chip-config.interface';
import { theme } from '../../../utils';

export const CHIPS_MATERIAL_CONFIG: Readonly<BlizzConfigChip> = {
  elements: {
    base: {
      styles: {
        padding: '0.5rem 1rem',
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
        padding: '0 0.5rem 0 0',
        margin: '0 0 0 -0.5rem',
      },
    },
    suffix: {
      styles: {
        padding: '0 0 0 0.5rem',
        margin: '0 -0.5rem 0 0',
      },
    },
  },
  states: {
    hover: {
      base: {
        styles: {
          bgColor: 'rgba(0, 0, 0, .05)',
        },
      },
    },
    selectable: {
      base: {
        styles: {
          cursor: 'pointer',
        },
      },
    },
    selected: {
      base: {
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
      base: {
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
