import { SafeDictionary, ValueOf } from 'ts-essentials';

/**
 * GENERAL TYPES
 */

export const CENTER = {
  Center: 'center',
} as const;

export const VERTICAL_EDGE = {
  Top: 'top',
  Bottom: 'bottom',
} as const;
export type VerticalEdge = ValueOf<typeof VERTICAL_EDGE>;
export type VerticalValues<T = string> = SafeDictionary<T, VerticalEdge>;

export const VERTICAL_POSITION = {
  ...VERTICAL_EDGE,
  ...CENTER,
} as const;
export type VerticalPosition = ValueOf<typeof VERTICAL_POSITION>;

export const HORIZONTAL_EDGE = {
  Right: 'right',
  Left: 'left',
} as const;
export type HorizontalEdge = ValueOf<typeof HORIZONTAL_EDGE>;
export type HorizontalValues<T = string> = SafeDictionary<T, HorizontalEdge>;

export const HORIZONTAL_POSITION = {
  ...HORIZONTAL_EDGE,
  ...CENTER,
} as const;
export type HorizontalPosition = ValueOf<typeof HORIZONTAL_POSITION>;

export const EDGE = {
  ...HORIZONTAL_EDGE,
  ...VERTICAL_EDGE,
} as const;
export type Edge = ValueOf<typeof EDGE>;
export type EdgesValues<T = string> = SafeDictionary<T, Edge>;

export const POSITION = {
  ...VERTICAL_POSITION,
  ...HORIZONTAL_POSITION,
} as const;
export type Position = ValueOf<typeof POSITION>;

export type AxisPosition<_Separator extends string = '-'> =
  `${VerticalPosition}${_Separator}${HorizontalPosition}`;

export type PerimeterPosition<_Separator extends string = '-'> =
  | `${VerticalEdge}${_Separator}${HorizontalPosition}`
  | `${HorizontalEdge}${_Separator}${VerticalPosition}`;

export const SIZE_PROP = {
  Width: 'width',
  Height: 'height',
} as const;
export type SizeProp = ValueOf<typeof SIZE_PROP>;
export type Size<T = string> = SafeDictionary<T, SizeProp>;

export const COORDINATE_PROP = {
  X: 'x',
  Y: 'y',
} as const;
export type CoordinateProp = ValueOf<typeof COORDINATE_PROP>;
export type Coordinates<T = string> = SafeDictionary<T, CoordinateProp>;

export const BORDER_PROP = {
  Width: 'width',
  Style: 'style',
  Color: 'color',
  Radius: 'radius',
} as const;
export type BorderProp = ValueOf<typeof BORDER_PROP>;
export type Border<T = string> = SafeDictionary<T, BorderProp>;

export const FONT_PROP = {
  Style: 'style',
  Weight: 'weight',
  Size: 'size',
  LineHeight: 'lineHeight',
  Family: 'family',
  Color: 'color',
} as const;
export type FontProp = ValueOf<typeof FONT_PROP>;

export type FontStyle = 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit';
export type FontWeight =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | 'initial'
  | 'inherit'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type Font = {
  [FONT_PROP.Style]?: FontStyle;
  [FONT_PROP.Weight]?: FontWeight;
  [FONT_PROP.Size]?: string;
  [FONT_PROP.LineHeight]?: string;
  [FONT_PROP.Family]?: string;
  [FONT_PROP.Color]?: string;
};

/**
 * SPECIAL TYPES
 */

export type InputLabelPosition = PerimeterPosition | 'floating';
