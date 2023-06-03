import { Dictionary } from '@blizz/core';

export interface BlizzComponent {
  variation: string | null;
  readonly config: Dictionary;
}
