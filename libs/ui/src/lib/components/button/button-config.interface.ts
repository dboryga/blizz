import {
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  BLIZZ_HOST_ELEMENT_KEY,
  NativeButtonState,
  Props,
} from '../../models';

export interface BlizzConfigButtonElements extends BlizzConfigComponentElementsDictionary {
  [BLIZZ_HOST_ELEMENT_KEY]?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      gap?: string;
      width?: Props.Clamp;
      height?: Props.Clamp;
      border?: Props.Border;
      text?: Props.Text;
      transform?: Props.Transform;
    };
  };
  prefix?: {
    styles: {
      padding?: string;
      margin?: string;
      text?: Props.Text;
      transform?: Props.Transform;
    };
  };
  suffix?: {
    styles: {
      padding?: string;
      margin?: string;
      text?: Props.Text;
      transform?: Props.Transform;
    };
  };
}

export type BlizzConfigButton = BlizzConfigComponent<BlizzConfigButtonElements, NativeButtonState>;
