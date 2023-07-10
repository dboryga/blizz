import { BLIZZ_HOST_ELEMENT_KEY } from '../../../models';
import { theme } from '../../../utils';
import { BlizzConfigButton } from '../button-config.interface';

export const BUTTON_MATERIAL_CONFIG: Readonly<BlizzConfigButton> = {
  elements: {
    [BLIZZ_HOST_ELEMENT_KEY]: {
      styles: {
        bgColor: theme('primary-500'),
        padding: '0 1.5rem',
        gap: '0.5rem',
        height: {
          min: '2.5rem',
        },
        text: {
          color: theme('white'),
          weight: '600',
        },
        border: {
          radius: '1.25rem',
        },
      },
    },
    prefix: {
      styles: {
        margin: '0 0 0 -0.5rem',
        text: {
          size: '1.25rem',
          weight: '400',
        },
      },
    },
    suffix: {
      styles: {
        margin: '0 -0.5rem 0 0',
        text: {
          size: '1.25rem',
          weight: '400',
        },
      },
    },
  },
  states: {
    hover: {
      [BLIZZ_HOST_ELEMENT_KEY]: {
        styles: {
          bgColor: theme('primary-600'),
        },
      },
    },
    focusVisible: {
      [BLIZZ_HOST_ELEMENT_KEY]: {
        styles: {
          bgColor: theme('primary-200'),
          text: {
            color: theme('primary-700'),
          },
        },
      },
    },
    disabled: {
      [BLIZZ_HOST_ELEMENT_KEY]: {
        styles: {
          cursor: 'default',
          bgColor: theme('neutral-200'),
          text: {
            color: theme('neutral-400'),
          },
        },
      },
    },
  },
  variations: {
    elevated: {
      elements: {
        [BLIZZ_HOST_ELEMENT_KEY]: {
          styles: {
            bgColor: 'transparent',
            text: {
              color: theme('primary-600'),
            },
            shadow:
              'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
          },
        },
      },
      states: {
        hover: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              shadow:
                'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
            },
          },
        },
        focus: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-50'),
            },
          },
        },
        focusVisible: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-50'),
            },
          },
        },
        disabled: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              cursor: 'default',
              bgColor: theme('neutral-200'),
              text: {
                color: theme('neutral-400'),
              },
              shadow: '',
            },
          },
        },
      },
    },
    tonal: {
      elements: {
        [BLIZZ_HOST_ELEMENT_KEY]: {
          styles: {
            bgColor: theme('primary-100'),
            text: {
              color: theme('primary-800'),
            },
          },
        },
      },
      states: {
        hover: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-200'),
            },
          },
        },
        focus: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-50'),
            },
          },
        },
        focusVisible: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-50'),
            },
          },
        },
        disabled: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              cursor: 'default',
              bgColor: theme('neutral-200'),
              text: {
                color: theme('neutral-400'),
              },
            },
          },
        },
      },
    },
    outlined: {
      elements: {
        [BLIZZ_HOST_ELEMENT_KEY]: {
          styles: {
            bgColor: 'transparent',
            text: {
              color: theme('primary-600'),
            },
            border: {
              width: '1px',
              color: theme('primary-600'),
            },
          },
        },
      },
      states: {
        hover: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-50'),
            },
          },
        },
        focus: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-50'),
            },
          },
        },
        focusVisible: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-50'),
            },
          },
        },
        disabled: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              text: {
                color: theme('neutral-400'),
              },
              border: {
                width: '1px',
                color: theme('neutral-400'),
              },
            },
          },
        },
      },
    },
    text: {
      elements: {
        [BLIZZ_HOST_ELEMENT_KEY]: {
          styles: {
            bgColor: 'transparent',
            text: {
              color: theme('primary-600'),
            },
          },
        },
      },
      states: {
        hover: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-50'),
            },
          },
        },
        focus: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
              bgColor: theme('primary-100'),
            },
          },
        },
        disabled: {
          [BLIZZ_HOST_ELEMENT_KEY]: {
            styles: {
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
