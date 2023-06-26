import {
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  NativeElementState,
  Props,
} from '../../models';

export interface BlizzConfigChipElements extends BlizzConfigComponentElementsDictionary {
  base?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      width?: Props.Clamp;
      border?: Props.Border;
      text?: Props.Text;
      transform?: Props.Transform;
    };
  };
  prefix?: {
    styles: {
      padding: string;
      margin?: string;
      transform?: Props.Transform;
    };
  };
  suffix?: {
    styles: {
      padding: string;
      margin?: string;
      transform?: Props.Transform;
    };
  };
}

export type BlizzConfigChipStates = NativeElementState | 'selected' | 'selectable' | 'disabled';

export type BlizzConfigChip = BlizzConfigComponent<BlizzConfigChipElements, BlizzConfigChipStates>;
