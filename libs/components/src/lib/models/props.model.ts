import { ValueOf } from 'ts-essentials';

/**
 * GENERAL TYPES
 */

export const Center = {
  Center: 'center',
} as const;

export const VerticalEdge = {
  Top: 'top',
  Bottom: 'bottom',
} as const;
export type VerticalEdge = ValueOf<typeof VerticalEdge>;
export type VerticalValues = {
  [VerticalEdge.Top]: string;
  [VerticalEdge.Bottom]: string;
};

export const VerticalPosition = {
  ...VerticalEdge,
  ...Center,
} as const;
export type VerticalPosition = ValueOf<typeof VerticalPosition>;

export const HorizontalEdge = {
  Right: 'right',
  Left: 'left',
} as const;
export type HorizontalEdge = ValueOf<typeof HorizontalEdge>;
export type HorizontalValues = {
  [HorizontalEdge.Right]: string;
  [HorizontalEdge.Left]: string;
};

export const HorizontalPosition = {
  ...HorizontalEdge,
  ...Center,
} as const;
export type HorizontalPosition = ValueOf<typeof HorizontalPosition>;

export const Edge = {
  ...HorizontalEdge,
  ...VerticalEdge,
} as const;
export type Edge = ValueOf<typeof Edge>;
export type EdgesValues = VerticalValues | HorizontalValues | (VerticalValues & HorizontalValues);

export const Position = {
  ...VerticalPosition,
  ...HorizontalPosition,
} as const;
export type Position = ValueOf<typeof Position>;

export type AxisPosition<_Separator extends string = '-'> =
  `${VerticalPosition}${_Separator}${HorizontalPosition}`;

export type PerimeterPosition<_Separator extends string = '-'> =
  | `${VerticalEdge}${_Separator}${HorizontalPosition}`
  | `${HorizontalEdge}${_Separator}${VerticalPosition}`;

export const SizeProp = {
  Width: 'width',
  Height: 'height',
} as const;
export type SizeProp = ValueOf<typeof SizeProp>;
export type Size = {
  [SizeProp.Width]: string;
  [SizeProp.Height]: string;
};

export const CoordinateProp = {
  X: 'x',
  Y: 'y',
} as const;
export type CoordinateProp = ValueOf<typeof CoordinateProp>;
export type Coordinates = {
  [CoordinateProp.X]?: string;
  [CoordinateProp.Y]?: string;
};

export type BorderStyle =
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | 'unset';

export const BorderProp = {
  Radius: 'radius',
  Width: 'width',
  Color: 'color',
  Style: 'style',
} as const;
export type BorderProp = ValueOf<typeof BorderProp>;
export type Border = {
  [BorderProp.Radius]?: string;
  [BorderProp.Width]?: string;
  [BorderProp.Color]?: string;
  [BorderProp.Style]?: BorderStyle;
};

export const TextProp = {
  Size: 'size',
  Color: 'color',
  Height: 'height',
  Weight: 'weight',
  Style: 'style',
  Font: 'font',
  Transform: 'transform',
  LetterSpacing: 'letterSpacing',
  WordSpacing: 'wordSpacing',
} as const;
export type TextProp = ValueOf<typeof TextProp>;

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

export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

export type Text = {
  [TextProp.Size]?: string;
  [TextProp.Color]?: string;
  [TextProp.Height]?: string;
  [TextProp.Weight]?: FontWeight;
  [TextProp.Style]?: FontStyle;
  [TextProp.Font]?: string;
  [TextProp.Transform]?: TextTransform;
  [TextProp.LetterSpacing]?: string;
  [TextProp.WordSpacing]?: string;
};

export const ClampProp = {
  Value: 'value',
  Min: 'min',
  Max: 'max',
} as const;
export type ClampProp = ValueOf<typeof ClampProp>;
export type Clamp = {
  [ClampProp.Value]?: string;
  [ClampProp.Min]?: string;
  [ClampProp.Max]?: string;
};

export const TransformProp = {
  Opacity: 'opacity',
  Translate: 'translate',
  Scale: 'scale',
  Rotate: 'rotate',
  Origin: 'origin',
} as const;
export type TransformProp = ValueOf<typeof TransformProp>;
export type Transform = {
  [TransformProp.Opacity]?: string;
  [TransformProp.Translate]?: string;
  [TransformProp.Scale]?: string;
  [TransformProp.Rotate]?: string;
  [TransformProp.Origin]?: string;
};

export type Cursor =
  | 'auto'
  | 'default'
  | 'none'
  | 'context-menu'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'cell'
  | 'crosshair'
  | 'text'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'move'
  | 'no-drop'
  | 'not-allowed'
  | 'grab'
  | 'grabbing'
  | 'e-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'col-resize'
  | 'row-resize'
  | 'all-scroll'
  | 'zoom-in'
  | 'zoom-out';

export type FlexAlignSelf =
  | 'auto'
  | 'normal'
  | 'center'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'stretch'
  | 'unset';

/**
 * SPECIAL TYPES
 */

export type InputLabelPosition = PerimeterPosition | 'floating';
