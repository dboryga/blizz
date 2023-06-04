import { BlizzConfigComponent, BlizzConfigComponentElementsDictionary, Props } from '../../models';

export interface BlizzConfigChipElements extends BlizzConfigComponentElementsDictionary {
  base?: {
    styles?: {
      padding?: string;
      border?: Props.Border;
      lineHeight?: string;
    };
  };
}

export type BlizzConfigChip = BlizzConfigComponent<BlizzConfigChipElements>;
