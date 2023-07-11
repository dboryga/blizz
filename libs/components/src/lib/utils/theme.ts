import { ThemeColorName } from '../models';

export const theme = <_Color extends string = ThemeColorName>(
  color: _Color,
): `var(--bzz-theme_${_Color})` => `var(--bzz-theme_${color})`;
