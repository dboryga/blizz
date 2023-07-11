import {
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  BLIZZ_HOST_ELEMENT_KEY,
  NativeButtonState,
  Props,
} from '../../models';

export interface BlizzConfigIconButtonElements extends BlizzConfigComponentElementsDictionary {
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
  icon?: {
    styles: {
      variation?: string;
    };
  };
}

export type BlizzConfigIconButton = BlizzConfigComponent<
  BlizzConfigIconButtonElements,
  NativeButtonState
>;
