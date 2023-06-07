import { RgbColor } from './rgb';

// MODELS
export type HEX = `#${string}`;

// UTILS
export const HEX_REGEX = /^#[0-9a-fA-F]+$/;
export const isValidHex = (value: string): value is HEX => {
  return HEX_REGEX.test(value);
};
export const isValidHexColor = (value: string): value is HEX => {
  return isValidHex(value) && [4, 5, 7, 9].includes(value.length);
};

export const hex = (value: string) => new HexColor(value);

// CLASS
export class HexColor {
  get fullValue(): HEX {
    if (this.value.length === 4) {
      const [r, g, b] = this.value.substring(1);
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    if (this.value.length === 5) {
      const [r, g, b, a] = this.value.substring(1);
      return `#${r}${r}${g}${g}${b}${b}${a}${a}`;
    }
    return this.value as HEX;
  }

  constructor(public value: HEX | string) {
    if (value[0] !== '#') this.value = '#' + value;
    if (!isValidHexColor(value)) {
      throw new Error('HexColor: Provided value is not valid HEX color definition');
    }
  }

  static fromString(stringValue: HEX) {
    return new HexColor(stringValue);
  }

  static fromRgb(red: number, green: number, blue: number, alpha?: number) {
    let r = red.toString(16);
    let g = green.toString(16);
    let b = blue.toString(16);
    const a = alpha ? alpha.toString(16) : '';

    if (r.length === 1) r = '0' + r;
    if (g.length === 1) g = '0' + g;
    if (b.length === 1) b = '0' + b;

    return new HexColor(`#${r}${g}${b}${a}`);
  }

  /**
   * @returns String representation of HEX value.
   */
  toString() {
    return this.fullValue;
  }

  /**
   * @returns Array representation of HEX value,
   * where values are following HEX strings: `[red, green, blue, alpha?]`.
   */
  toArray() {
    return this.fullValue.substring(1).match(/.{1,2}/g) as [string, string, string, string?];
  }

  toRgbArray() {
    const rgbaArray = this.toArray().map((hex) => parseInt(hex!, 16));
    if (rgbaArray[3]) rgbaArray[3] = rgbaArray[3] / 255;
    return rgbaArray as [number, number, number, number?];
  }

  toRgb() {
    return new RgbColor(this.toRgbArray());
  }

  toHsl() {
    return this.toRgb().toHsl();
  }

  toHwb() {
    return this.toRgb().toHwb();
  }
}
