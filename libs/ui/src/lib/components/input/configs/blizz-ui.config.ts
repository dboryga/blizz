import { BlizzConfigInput } from '../input-config.interface';
import { theme } from '../../../utils';

export const INPUT_BLIZZ_UI_CONFIG: Readonly<BlizzConfigInput> = {
  elements: {
    base: {
      styles: {
        padding: '0.7rem 2.4rem',
        border: {
          style: 'solid',
          radius: 'none',
          width: '0',
        },
        lineHeight: '1',
        color: theme('text'),
        backgroundColor: theme('primary'),
      },
    },
    label: {
      styles: {
        color: theme('text'),
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
    },
  },
};
