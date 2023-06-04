import { injectComponentConfig } from "../config";


export interface BlizzComponent {
  variation: string | null;
  readonly config: ReturnType<typeof injectComponentConfig>;
}
