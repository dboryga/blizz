// MODELS
import { RgbColor } from './rgb';

export type HSL<
  _Hue extends number = number,
  _Saturation extends `${number}%` = `${number}%`,
  _Lightness extends `${number}%` = `${number}%`,
  _Alpha extends number = number,
> =
  | `hsl(${_Hue} ${_Saturation} ${_Lightness})`
  | `hsl(${_Hue}, ${_Saturation}, ${_Lightness})`
  | `hsl(${_Hue} ${_Saturation} ${_Lightness} / ${_Alpha})`
  | `hsla(${_Hue}, ${_Saturation}, ${_Lightness}, ${_Alpha})`;

export interface HslValue {
  hue: number;
  saturation: number;
  lightness: number;
  alpha?: number;
}

// UTILS
export const hsl = (hue: number, saturation: number, lightness: number, alpha?: number) =>
  new HslColor([hue, saturation, lightness, alpha]);

// CLASS
export class HslColor implements HslValue {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;

  get value(): HslValue {
    return {
      hue: this.hue,
      saturation: this.saturation,
      lightness: this.lightness,
      alpha: this.alpha,
    };
  }

  constructor(value: HSL | HslValue | [number, number, number, number?]) {
    if (typeof value === 'string') value = HslColor.stringToArray(value);
    if (Array.isArray(value)) {
      this.hue = value[0];
      this.saturation = value[1];
      this.lightness = value[2];
      this.alpha = value[3] ?? 1;
      return;
    }
    this.hue = value.hue;
    this.saturation = value.saturation;
    this.lightness = value.lightness;
    this.alpha = value.alpha ?? 1;
  }

  /**
   * @param {string} stringValue `"hsl(hue, saturation, lightness)"` or `"hsla(hue, saturation, lightness, alpha)"`
   * @returns Array representation of HSL or HSLA value - `[hue, saturation, lightness, alpha?]`
   */
  static stringToArray(stringValue: HSL) {
    return stringValue
      .substring(stringValue.indexOf('(') + 1, stringValue.lastIndexOf(')'))
      .trim()
      .split(/[,\s/]+/g)
      .map((str) => parseFloat(str)) as [number, number, number, number?];
  }

  /**
   * @param {string} stringValue `"hsl(hue, saturation, lightness)"` or `"hsla(hue, saturation, lightness, alpha)"`
   */
  static fromString(stringValue: HSL): HslColor {
    return new HslColor(stringValue);
  }

  /**
   * @param {number[]} arrayValue `[hue, saturation, lightness, alpha?]`
   */
  static fromArray(arrayValue: [number, number, number, number?]): HslColor {
    return new HslColor(arrayValue);
  }

  static fromValue(objectValue: HslValue): HslColor {
    return new HslColor(objectValue);
  }

  /**
   * @returns String representation of HSL value.
   *
   * Alpha is omitted when `1`
   */
  toString(): HSL {
    return this.alpha === 1
      ? `hsl(${this.hue} ${this.saturation}% ${this.lightness}%)`
      : `hsl(${this.hue} ${this.saturation}% ${this.lightness}% / ${this.alpha})`;
  }

  /**
   * @returns Array representation of HSL value,
   * where values are following: `[hue, saturation, lightness, alpha]`.
   */
  toArray(): [number, number, number, number] {
    return [this.hue, this.saturation, this.lightness, this.alpha];
  }

  toRgb() {
    const s = this.saturation * 0.01;
    const l = this.lightness * 0.01;
    const k = (n: number) => (n + this.hue / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return new RgbColor([255 * f(0), 255 * f(8), 255 * f(4), this.alpha]);
  }

  toHex() {
    return this.toRgb().toHex();
  }

  toHwb() {
    return this.toRgb().toHwb();
  }
}
