import { BlizzConfigIcon } from '../icon-config.interface';

export const ICON_MATERIAL_CONFIG: Readonly<BlizzConfigIcon> = {
  elements: {
    body: {
      styles: {
        text: {
          size: '1.5rem',
          height: '1',
          weight: '400',
        },
      },
    },
  },
  states: {},
  variations: {
    xs: {
      elements: {
        body: {
          styles: {
            text: {
              size: '1rem',
            },
          },
        },
      },
    },
    xl: {
      elements: {
        body: {
          styles: {
            text: {
              size: '2rem',
            },
          },
        },
      },
    },
    '2xl': {
      elements: {
        body: {
          styles: {
            text: {
              size: '2.5rem',
            },
          },
        },
      },
    },
    '3xl': {
      elements: {
        body: {
          styles: {
            text: {
              size: '3.5rem',
            },
          },
        },
      },
    },
  },
};
