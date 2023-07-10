import { BLIZZ_HOST_ELEMENT_KEY } from '../../../models';
import { BlizzConfigIconButton } from '../icon-button-config.interface';
import { theme } from '../../../utils';

export const ICON_BUTTON_MATERIAL_CONFIG: Readonly<BlizzConfigIconButton> = {
  elements: {
    [BLIZZ_HOST_ELEMENT_KEY]: {
      styles: {
        bgColor: 'transparent',
        padding: '0.75rem',
        text: {
          size: '1.5rem',
          height: '1',
          color: theme('neutral-500'),
        },
        border: {
          radius: '100%',
        },
      },
    },
  },
  states: {
    hover: {
      [BLIZZ_HOST_ELEMENT_KEY]: {
        styles: {
          bgColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    focusVisible: {
      [BLIZZ_HOST_ELEMENT_KEY]: {
        styles: {
          text: {
            color: theme('primary-600'),
          },
        },
      },
    },
    disabled: {
      [BLIZZ_HOST_ELEMENT_KEY]: {
        styles: {
          text: {
            color: theme('neutral-300'),
          },
        },
      },
    },
  },
  variations: {
    fab: {
      elements: {
        [BLIZZ_HOST_ELEMENT_KEY]: {
          styles: {
            padding: '1rem',
            bgColor: theme('primary'),
            text: {
              size: '2rem',
              color: theme('white'),
            },
          },
        },
      },
      states: {
        hover: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              shadow:
                '0px 3px 5px -1px rgba(0, 0, 0, 0.16), 0px 6px 10px 0px rgba(0, 0, 0, 0.12), 0px 1px 18px 0px rgba(0, 0, 0, 0.08)',
            },
          },
        },
        disabled: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('neutral-300'),
              text: {
                color: theme('neutral-400'),
              },
            },
          },
        },
      },
    },
    miniFab: {
      elements: {
        [BLIZZ_HOST_ELEMENT_KEY]: {
          styles: {
            bgColor: theme('primary'),
            text: {
              color: theme('white'),
            },
          },
        },
      },
      states: {
        hover: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              shadow:
                '0px 3px 5px -1px rgba(0, 0, 0, 0.16), 0px 6px 10px 0px rgba(0, 0, 0, 0.12), 0px 1px 18px 0px rgba(0, 0, 0, 0.08)',
            },
          },
        },
        disabled: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('neutral-300'),
              text: {
                color: theme('neutral-400'),
              },
            },
          },
        },
      },
    },
  },
};
