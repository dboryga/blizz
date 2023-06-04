export interface SquareDimensions {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}

export interface XY {
  x?: string;
  y?: string;
}

export type Border =
  | {
      width?: string;
      style?: string;
      radius?: string;
    }
  | 'none';
