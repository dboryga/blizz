import { HEX, HexColor } from './hex';
import { HSL, HslColor } from './hsl';
import { HWB, HwbColor } from './hwb';
import { RGB, RgbColor } from './rgb';

// MODELS
export type Color = HEX | RGB | HSL | HWB;

// UTILS
export function colorType(value: Color) {
  if (!value?.length) return null;
  if (value[0] === '#') return 'hex';
  if (value.substring(0, 3) === 'rgb') return 'rgb';
  if (value.substring(0, 3) === 'hsl') return 'hsl';
  if (value.substring(0, 3) === 'hwb') return 'hwb';
  return null;
}

export function color(value: Color) {
  switch (colorType(value)) {
    case 'hex':
      return new HexColor(value);
    case 'rgb':
      return new RgbColor(value as RGB);
    case 'hsl':
      return new HslColor(value as HSL);
    case 'hwb':
      return new HwbColor(value as HWB);
  }
  return null;
}
