import { BlizzConfigComponent, BlizzConfigComponentElementsDictionary, Props } from '../../models';

export interface BlizzConfigInputElements extends BlizzConfigComponentElementsDictionary {
  base?: {
    styles?: {
      padding?: string;
      border?: Props.Border;
      lineHeight?: string;
      color?: string;
      backgroundColor?: string;
    };
  };
  label?: {
    styles?: {
      color?: string;
    };
  };
}

export type BlizzConfigInput = BlizzConfigComponent<BlizzConfigInputElements>;
