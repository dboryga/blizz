import {
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  BLIZZ_HOST_ELEMENT_KEY,
  NativeInputState,
  Props,
} from '../../models';
import { InputLabelPosition } from '../../models/props.model';

export interface BlizzConfigInputElements extends BlizzConfigComponentElementsDictionary {
  [BLIZZ_HOST_ELEMENT_KEY]?: {
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
  field?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      gap?: string;
      border?: Props.Border;
      text?: Props.Text;
      transform?: Props.Transform;
    };
  };
  label?: {
    styles: {
      cursor?: Props.Cursor;
      position?: InputLabelPosition;
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

export type BlizzConfigInputStates = NativeInputState | 'labelFloating' | 'empty';

export type BlizzConfigInput = BlizzConfigComponent<
  BlizzConfigInputElements,
  BlizzConfigInputStates
>;
