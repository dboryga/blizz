import {
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  BLIZZ_HOST_ELEMENT_KEY,
  NativeElementState,
  Props,
} from '../../models';

export interface BlizzConfigChipElements extends BlizzConfigComponentElementsDictionary {
  [BLIZZ_HOST_ELEMENT_KEY]?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      gap?: string;
      width?: Props.Clamp;
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

export type BlizzConfigChipStates = NativeElementState | 'selected' | 'selectable' | 'disabled';

export type BlizzConfigChip = BlizzConfigComponent<BlizzConfigChipElements, BlizzConfigChipStates>;
