import {
  BLIZZ_HOST_ELEMENT_KEY,
  BlizzConfigComponent,
  BlizzConfigComponentElementsDictionary,
  NativeInputState,
  Props,
} from '../../models';

export interface BlizzConfigSelectElements extends BlizzConfigComponentElementsDictionary {
  [BLIZZ_HOST_ELEMENT_KEY]?: {
    styles: {
      cursor?: Props.Cursor;
      transform?: Props.Transform;
    };
  };
}

export type BlizzConfigSelect = BlizzConfigComponent<BlizzConfigSelectElements, NativeInputState>;
