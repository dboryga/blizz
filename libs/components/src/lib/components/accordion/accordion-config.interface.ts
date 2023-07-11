import {
  BLIZZ_HOST_ELEMENT_KEY,
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  Props,
} from '../../models';

export interface BlizzConfigAccordionElements extends BlizzConfigComponentElementsDictionary {
  [BLIZZ_HOST_ELEMENT_KEY]?: {
    styles: {
      bgColor?: string;
      padding?: string;
      margin?: string;
      gap?: string;
      width?: Props.Clamp;
      border?: Props.Border;
      shadow?: string;
      transform?: Props.Transform;
    };
  };
  expansionPanel?: {
    styles: {
      variation?: string;
    };
  };
}

export type BlizzConfigAccordion = BlizzConfigComponent<BlizzConfigAccordionElements>;
