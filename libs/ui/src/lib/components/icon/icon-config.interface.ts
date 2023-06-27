import {
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  BLIZZ_HOST_ELEMENT_KEY,
  Props,
} from '../../models';

export interface BlizzConfigIconElements extends BlizzConfigComponentElementsDictionary {
  [BLIZZ_HOST_ELEMENT_KEY]?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      width?: Props.Clamp;
      height?: Props.Clamp;
      border?: Props.Border;
      text?: Props.Text;
      transform?: Props.Transform;
    };
  };
}

export type BlizzConfigIcon = BlizzConfigComponent<BlizzConfigIconElements>;
