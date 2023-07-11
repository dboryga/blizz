import {
  BLIZZ_HOST_ELEMENT_KEY,
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  NativeElementState,
  Props,
} from '../../models';

export interface BlizzConfigExpansionPanelElements extends BlizzConfigComponentElementsDictionary {
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
  trigger?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      gap?: string;
      width?: Props.Clamp;
      height?: Props.Clamp;
      text?: Props.Text;
      border?: Props.Border;
      shadow?: string;
      transform?: Props.Transform;
    };
  };
  indicator?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      position?: 'start' | 'end';
      width?: Props.Clamp;
      height?: Props.Clamp;
      text?: Props.Text;
      border?: Props.Border;
      shadow?: string;
      transform?: Props.Transform;
    };
  };
  defaultIndicator?: {
    styles: {
      variation?: string;
      icon?: string;
      text?: Props.Text;
      transform?: Props.Transform;
    };
  };
  content?: {
    styles: {
      cursor?: Props.Cursor;
      bgColor?: string;
      padding?: string;
      margin?: string;
      gap?: string;
      width?: Props.Clamp;
      height?: Props.Clamp;
      text?: Props.Text;
      border?: Props.Border;
      shadow?: string;
      transform?: Props.Transform;
    };
  };
}

export type BlizzConfigExpansionPanelStates = NativeElementState | 'expanded' | 'triggerHover';

export type BlizzConfigExpansionPanel = BlizzConfigComponent<
  BlizzConfigExpansionPanelElements,
  BlizzConfigExpansionPanelStates
>;
