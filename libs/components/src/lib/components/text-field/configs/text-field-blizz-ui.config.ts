import { BlizzConfigTextField } from '../text-field-config.interface';
import { theme } from '../../../utils';
import { BLIZZ_HOST_ELEMENT_KEY } from '../../../models';

export const TEXT_FIELD_BLIZZ_UI_CONFIG: Readonly<BlizzConfigTextField> = {
  elements: {
    [BLIZZ_HOST_ELEMENT_KEY]: {
      styles: {
        width: {
          value: '100%',
        },
        text: {
          size: '1rem',
          height: '1.5',
          color: theme('text'),
          letterSpacing: '.5px',
        },
      },
    },
    field: {
      styles: {
        padding: '0.625rem 1rem',
        gap: '0.5rem',
        bgColor: theme('white'),
        border: {
          width: '1px',
          color: 'rgba(0, 0, 0, 0.2)',
          style: 'solid',
          radius: '0',
        },
      },
    },
    label: {
      styles: {
        position: 'floating',
        text: {
          color: 'rgba(0, 0, 0, 0.7)',
        },
        floatingScale: '0.8',
        floatingBorderGap: '4px',
      },
    },
    placeholder: {
      styles: {
        transform: {
          scale: '0',
          origin: 'left bottom',
        },
        text: {
          color: theme('neutral-400'),
        },
      },
    },
  },
  states: {
    labelFloating: {
      label: {
        styles: {
          transform: {
            translate: '0 -50%',
          },
        },
      },
      placeholder: {
        styles: {
          transform: {
            scale: '1',
          },
        },
      },
    },
    hover: {
      field: {
        styles: {
          border: {
            width: '2px',
            color: 'rgba(0, 0, 0, 0.36)',
          },
        },
      },
    },
    focus: {
      field: {
        styles: {
          border: {
            width: '2px',
            color: theme('primary'),
          },
        },
      },
      label: {
        styles: {
          text: {
            color: theme('primary-700'),
          },
        },
      },
    },
    invalid: {
      field: {
        styles: {
          border: {
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
    disabled: {
      base: {
        styles: {
          cursor: 'default',
        },
      },
      field: {
        styles: {
          cursor: 'default',
          bgColor: theme('neutral-200'),
          text: {
            color: theme('neutral-400'),
          },
          border: {
            width: '1px',
            color: theme('neutral-300'),
          },
        },
      },
      label: {
        styles: {
          text: {
            color: theme('neutral-400'),
          },
        },
      },
    },
  },
  variations: {
    hero: {
      elements: {
        base: {
          styles: {
            width: {
              value: '100%',
            },
          },
        },
        field: {
          styles: {
            padding: '0.75rem 1.5rem',
            border: {
              width: '2px',
              color: theme('primary'),
            },
            text: {
              height: '1.5',
            },
          },
        },
        label: {
          styles: {
            position: 'top-left',
            padding: '0',
            text: {
              color: theme('primary-600'),
              weight: 'bold',
              letterSpacing: '0',
            },
          },
        },
        placeholder: {
          styles: {
            transform: {
              scale: '1',
            },
          },
        },
        prefix: {
          styles: {
            text: {
              size: '1.5rem',
              color: theme('primary'),
            },
          },
        },
        suffix: {
          styles: {
            text: {
              size: '1.5rem',
              color: theme('primary-600'),
            },
          },
        },
      },
      states: {
        hover: {
          field: {
            styles: {
              bgColor: theme('neutral-50'),
            },
          },
        },
        focus: {
          field: {
            styles: {
              bgColor: theme('neutral-50'),
            },
          },
        },
        invalid: {
          field: {
            styles: {
              border: {
                color: theme('error'),
              },
            },
          },
          label: {
            styles: {
              text: {
                color: theme('error'),
              },
            },
          },
        },
        disabled: {
          base: {
            styles: {
              cursor: 'default',
            },
          },
          field: {
            styles: {
              border: {
                color: theme('neutral-300'),
              },
            },
          },
          label: {
            styles: {
              text: {
                color: 'rgba(0, 0, 0, 0.36)',
              },
            },
          },
        },
      },
    },
  },
};
