import { BlizzConfigInput } from '../input-config.interface';
import { theme } from '../../../utils';

export const INPUT_MATERIAL_CONFIG: Readonly<BlizzConfigInput> = {
  elements: {
    base: {
      styles: {
        width: {
          value: '100%',
        },
        padding: '1.4rem 0 0 0',
        bgColor: theme('neutral-100'),
        border: {
          width: '0 0 1px 0',
          color: 'rgba(0, 0, 0, .38)',
          style: 'solid',
          radius: '0.25rem 0.25rem 0 0',
        },
      },
    },
    field: {
      styles: {
        padding: '0.1rem 1rem 0.5rem',
        text: {
          size: '1rem',
          height: '1.5',
          color: theme('text'),
          letterSpacing: '0.5px',
        },
      },
    },
    label: {
      styles: {
        position: 'floating',
        text: {
          size: '1rem',
          height: '1',
          color: 'rgba(0, 0, 0, .6)',
          letterSpacing: '0.5px',
        },
        transform: {
          translate: '0 -0.7rem',
        },
        floatingScale: '0.8',
        floatingBorderGap: '4px',
      },
    },
    placeholder: {
      styles: {
        text: {
          color: theme('neutral-400'),
        },
      },
    },
    prefix: {
      styles: {
        padding: '0 0.5rem 0 0',
      },
    },
    suffix: {
      styles: {
        padding: '0 0 0 0.5rem',
      },
    },
  },
  states: {
    hover: {
      base: {
        styles: {
          bgColor: theme('neutral-200'),
          border: {
            color: 'rgba(0, 0, 0, .87)',
          },
        },
      },
    },
    focus: {
      base: {
        styles: {
          border: {
            width: '0 0 2px 0',
            color: theme('primary'),
          },
        },
      },
      label: {
        styles: {
          text: {
            color: theme('primary-600'),
          },
        },
      },
    },
    invalid: {
      base: {
        styles: {
          border: {
            width: '2px',
            color: theme('error'),
          },
        },
      },
      label: {
        styles: {
          text: {
            color: theme('error-700'),
          },
        },
      },
    },
  },
  variations: {
    outlined: {
      elements: {
        base: {
          styles: {
            padding: '1rem',
            bgColor: 'transparent',
            border: {
              width: '1px',
              radius: '0.25rem',
            },
          },
        },
        field: {
          styles: {
            padding: '0',
            bgColor: 'transparent',
          },
        },
        label: {
          styles: {
            transform: {
              translate: 'unset',
            },
          },
        },
      },
      states: {
        focus: {
          base: {
            styles: {
              border: {
                width: '2px',
              },
            },
          },
        },
      },
    },
  },
};
