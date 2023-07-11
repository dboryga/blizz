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
      text?: Props.Text;
      border?: Props.Border;
      shadow?: string;
      transform?: Props.Transform;
    };
  };
}

export type BlizzConfigIcon = BlizzConfigComponent<BlizzConfigIconElements>;
