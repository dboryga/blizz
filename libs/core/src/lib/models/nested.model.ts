import { KeyofBase } from 'ts-essentials/dist/key-of-base';

export type Nested<_Value, _Keys extends KeyofBase = string> = {
  [key in _Keys]?: _Value | Nested<_Value>;
};
