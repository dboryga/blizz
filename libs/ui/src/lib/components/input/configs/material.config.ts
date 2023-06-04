import { theme } from '../../../utils';
import { BlizzConfigInput } from '../input-config.interface';

export const INPUT_MATERIAL_CONFIG: Readonly<BlizzConfigInput> = {
  elements: {
    base: {
      styles: {
        color: theme('white'),
        backgroundColor: theme('primary'),
        padding: '1em 2rem',
        border: {
          style: 'solid',
          width: '0',
          radius: '1rem',
        },
        lineHeight: '1',
      },
    },
    label: {
      styles: {
        color: theme('primary'),
      },
    },
  },
};
