export interface SquareDimensions<T = string> {
  top?: T;
  left?: T;
  bottom?: T;
  right?: T;
}

export interface XY<T = string> {
  x?: T;
  y?: T;
}

export interface Border {
  width?: string;
  style?: string;
  radius?: string;
}
