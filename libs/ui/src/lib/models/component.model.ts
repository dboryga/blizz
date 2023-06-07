import { getVariationConfig, injectComponentConfig } from '../config';
import { ComponentKey } from './config.model';

export interface BlizzComponent {
  readonly componentName: ComponentKey;
  readonly id: `bzz-${ComponentKey}-${number}`;

  readonly config: ReturnType<typeof injectComponentConfig>;

  readonly variation: string | null;

  get variationConfig(): ReturnType<typeof getVariationConfig>;
}
