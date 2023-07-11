import {
  BLIZZ_HOST_ELEMENT_KEY,
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  NativeInputState,
  Props,
} from '../../models';

export interface BlizzConfigTextFieldElements extends BlizzConfigComponentElementsDictionary {
  [BLIZZ_HOST_ELEMENT_KEY]?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      width?: Props.Clamp;
      text?: Props.Text;
      border?: Props.Border;
      shadow?: string;
      transform?: Props.Transform;
    };
  };
  field?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      gap?: string;
      text?: Props.Text;
      border?: Props.Border;
      shadow?: string;
      transform?: Props.Transform;
    };
  };
  label?: {
    styles: {
      cursor?: Props.Cursor;
      position?: Props.InputLabelPosition;
      padding?: string;
      margin?: string;
      text?: Props.Text;
      transform?: Props.Transform;
      floatingScale?: string;
      floatingBorderGap?: string;
    };
  };
  placeholder?: {
    styles: {
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

export type BlizzConfigTextFieldStates = NativeInputState | 'empty' | 'labelFloating';

export type BlizzConfigTextField = BlizzConfigComponent<
  BlizzConfigTextFieldElements,
  BlizzConfigTextFieldStates
>;
