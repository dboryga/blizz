import { BLIZZ_HOST_ELEMENT_KEY } from '../../../models';
import { BlizzConfigAccordion } from '../accordion-config.interface';

export const ACCORDION_BLIZZ_UI_CONFIG: Readonly<BlizzConfigAccordion> = {
  elements: {
    [BLIZZ_HOST_ELEMENT_KEY]: {
      styles: {},
    },
    expansionPanel: {
      styles: {
        variation: 'contrast',
      },
    },
  },
  states: {},
  variations: {},
};
