export const theme = <_Color extends string>(color: _Color): `var(--bzz-theme_${_Color})` =>
  `var(--bzz-theme_${color})`;
