import { HexColor } from './hex';
import { HslColor } from './hsl';
import { HwbColor } from './hwb';

// MODELS
export type RGB<
  _Red extends number = number,
  _Green extends number = number,
  _Blue extends number = number,
  _Alpha extends number = number,
> =
  | `rgb(${_Red} ${_Green} ${_Blue})`
  | `rgb(${_Red}, ${_Green}, ${_Blue})`
  | `rgb(${_Red} ${_Green} ${_Blue} / ${_Alpha})`
  | `rgba(${_Red}, ${_Green}, ${_Blue}, ${_Alpha})`;

export interface RgbValue {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}

// UTILS
export const rgb = (red: number, green: number, blue: number, alpha?: number) =>
  new RgbColor([red, green, blue, alpha]);

// CLASS
export class RgbColor implements RgbValue {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  get value(): RgbValue {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
      alpha: this.alpha,
    };
  }

  constructor(value: RGB | RgbValue | [number, number, number, number?]) {
    if (typeof value === 'string') value = RgbColor.stringToArray(value);
    if (Array.isArray(value)) {
      this.red = value[0];
      this.green = value[1];
      this.blue = value[2];
      this.alpha = value[3] ?? 1;
      return;
    }
    this.red = value.red;
    this.green = value.green;
    this.blue = value.blue;
    this.alpha = value.alpha ?? 1;
  }

  /**
   * @param {string} stringValue `"rgb(red, green, blue)"` or `"rgba(red, green, blue, alpha)"`
   * @returns Array representation of RGB or RGBA value - `[red, green, blue, alpha?]`
   */
  static stringToArray(stringValue: RGB) {
    return stringValue
      .substring(stringValue.indexOf('(') + 1, stringValue.lastIndexOf(')'))
      .trim()
      .split(/[,\s/]+/g)
      .map((str) => parseFloat(str)) as [number, number, number, number?];
  }

  /**
   * @param {string} stringValue `"rgb(red green blue)"` or `"rgb(red green blue / alpha)"`
   */
  static fromString(stringValue: RGB): RgbColor {
    return new RgbColor(stringValue);
  }

  /**
   * @param {number[]} arrayValue `[red, green, blue, alpha?]`
   */
  static fromArray(arrayValue: [number, number, number, number?]): RgbColor {
    return new RgbColor(arrayValue);
  }

  static fromValue(objectValue: RgbValue): RgbColor {
    return new RgbColor(objectValue);
  }

  /**
   * @returns String representation of RGB or RGBA value.
   *
   * Alpha is omitted when `1`
   */
  toString(): RGB {
    return this.alpha === 1
      ? `rgb(${this.red} ${this.green} ${this.blue})`
      : `rgb(${this.red} ${this.green} ${this.blue} / ${this.alpha})`;
  }

  /**
   * @returns Array representation of RGBA value,
   * where values are following: `[red, green, blue, alpha]`.
   */
  toArray(): [number, number, number, number] {
    return [this.red, this.green, this.blue, this.alpha];
  }

  toHex() {
    const alpha = this.alpha !== 1 ? this.alpha : undefined;
    return HexColor.fromRgb(this.red, this.green, this.blue, alpha);
  }

  toHsl() {
    const r = this.red / 255;
    const g = this.green / 255;
    const b = this.blue / 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
    return new HslColor([
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
      this.alpha,
    ]);
  }

  toHwb() {
    const r = this.red / 255;
    const g = this.green / 255;
    const b = this.blue / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;

    let hue;
    if (chroma === 0) hue = 0;
    else if (r === max) hue = (((g - b) / chroma) % 6) * 360;
    else if (g === max) hue = (((b - r) / chroma + 2) % 6) * 360;
    else hue = (((r - g) / chroma + 4) % 6) * 360;

    return new HwbColor([hue, min, 1 - max, this.alpha]);
  }
}
