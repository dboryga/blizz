import { BlizzConfigButton } from '../button-config.interface';
import { theme } from '../../../utils';

export const BUTTON_BLIZZ_UI_CONFIG: Readonly<BlizzConfigButton> = {
  elements: {
    body: {
      styles: {
        bgColor: 'transparent',
        padding: '0.5rem 1.5rem',
        gap: '0.5rem',
        border: {
          width: '2px',
          color: theme('primary'),
        },
        text: {
          size: '1rem',
          height: '1.5',
          color: theme('primary'),
          weight: 'bold',
          transform: 'uppercase',
          letterSpacing: '.5px',
        },
      },
    },
  },
  states: {
    hover: {
      body: {
        styles: {
          bgColor: theme('primary'),
          text: {
            color: theme('white'),
          },
        },
      },
    },
  },
  variations: {},
};
