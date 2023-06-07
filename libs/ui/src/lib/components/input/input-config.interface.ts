import {
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  NativeElementState,
  Props,
} from '../../models';
import { InputLabelPosition } from '../../models/props.model';

export interface BlizzConfigInputElements extends BlizzConfigComponentElementsDictionary {
  base: {
    styles: {
      padding?: string;
      border?: Props.Border;
    };
  };
  field: {
    styles: {
      bgColor?: string;
      padding?: string;
      border?: Props.Border;
      font?: Props.Font;
    };
  };
  label: {
    styles: {
      position?: InputLabelPosition;
      padding?: string;
      color?: string;
    };
  };
}

export type BlizzConfigInputStates = NativeElementState | 'myCustomState';

export type BlizzConfigInput = BlizzConfigComponent<
  BlizzConfigInputElements,
  BlizzConfigInputStates
>;
