import { BlizzConfigInput } from '../input-config.interface';
import { theme } from '../../../utils';

export const INPUT_BLIZZ_UI_CONFIG: Readonly<BlizzConfigInput> = {
  elements: {
    base: {
      styles: {
        padding: '0',
      },
    },
    field: {
      styles: {
        padding: '0.5rem 1rem',
        bgColor: theme('white'),
        border: {
          width: '1px',
          style: 'solid',
          color: theme('neutral-300'),
          radius: '0',
        },
      },
    },
    label: {
      styles: {
        position: 'top-left',
        color: theme('text'),
      },
    },
  },
  states: {
    hover: {
      field: {
        styles: {
          border: {
            color: theme('neutral'),
          },
        },
      },
    },
    myCustomState: {
      field: {
        styles: {
          border: {
            color: theme('primary'),
          },
        },
      },
    },
  },
  variations: {
    small: {
      elements: {
        base: {
          styles: {
            padding: '0.3rem 1rem',
          },
        },
      },
      states: {
        hover: {
          field: {
            styles: {
              border: {
                color: theme('black'),
              },
            },
          },
        },
        myCustomState: {
          field: {
            styles: {
              border: {
                color: theme('primary'),
              },
            },
          },
        },
      },
    },
  },
};
