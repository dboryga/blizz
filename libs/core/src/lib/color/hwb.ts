// MODELS
import { HslColor } from './hsl';
import { RgbColor } from './rgb';

export type HWB<
  _Hue extends number = number,
  _Whiteness extends `${number}%` = `${number}%`,
  _Blackness extends `${number}%` = `${number}%`,
  _Alpha extends number = number,
> =
  | `hwb(${_Hue} ${_Whiteness} ${_Blackness})`
  | `hwb(${_Hue}, ${_Whiteness}, ${_Blackness})`
  | `hwb(${_Hue} ${_Whiteness} ${_Blackness} / ${_Alpha})`;

export interface HwbValue {
  hue: number;
  whiteness: number;
  blackness: number;
  alpha?: number;
}

// UTILS
export const hwb = (hue: number, whiteness: number, blackness: number, alpha?: number) =>
  new HwbColor([hue, whiteness, blackness, alpha]);

// CLASS
export class HwbColor implements HwbValue {
  hue: number;
  whiteness: number;
  blackness: number;
  alpha: number;

  get value(): HwbValue {
    return {
      hue: this.hue,
      whiteness: this.whiteness,
      blackness: this.blackness,
      alpha: this.alpha,
    };
  }

  constructor(value: HWB | HwbValue | [number, number, number, number?]) {
    if (typeof value === 'string') value = HwbColor.stringToArray(value);
    if (Array.isArray(value)) {
      this.hue = value[0];
      this.whiteness = value[1];
      this.blackness = value[2];
      this.alpha = value[3] ?? 1;
      return;
    }
    this.hue = value.hue;
    this.whiteness = value.whiteness;
    this.blackness = value.blackness;
    this.alpha = value.alpha ?? 1;
  }

  /**
   * @param {string} stringValue `"hwb(hue whiteness blackness)"` or `"hwb(hue whiteness blackness / alpha)"`
   * @returns Array representation of HWB value - `[hue, whiteness, blackness, alpha?]`
   */
  static stringToArray(stringValue: HWB) {
    return stringValue
      .substring(stringValue.indexOf('(') + 1, stringValue.lastIndexOf(')'))
      .trim()
      .split(/[,\s/]+/g)
      .map((str) => parseFloat(str)) as [number, number, number, number?];
  }

  /**
   * @param {string} stringValue `"hwb(hue whiteness blackness)"` or `"hwb(hue whiteness blackness / alpha)"`
   */
  static fromString(stringValue: HWB): HwbColor {
    return new HwbColor(stringValue);
  }

  /**
   * @param {number[]} arrayValue `[hue, whiteness, blackness, alpha?]`
   */
  static fromArray(arrayValue: [number, number, number, number?]): HwbColor {
    return new HwbColor(arrayValue);
  }

  static fromValue(objectValue: HwbValue): HwbColor {
    return new HwbColor(objectValue);
  }

  /**
   * @returns String representation of HWB value.
   */
  toString(): HWB {
    return this.alpha === 1
      ? `hwb(${this.hue} ${this.whiteness}% ${this.blackness}%)`
      : `hwb(${this.hue} ${this.whiteness}% ${this.blackness}% / ${this.alpha})`;
  }

  /**
   * @returns Array representation of HWB,
   * where values are following: `[hue, whiteness, blackness, alpha]`.
   */
  toArray(): [number, number, number, number] {
    return [this.hue, this.whiteness, this.blackness, this.alpha];
  }

  toRgb() {
    let { whiteness, blackness } = this;
    const tot = whiteness + blackness;
    if (tot > 1) {
      whiteness = Number((whiteness / tot).toFixed(2));
      blackness = Number((blackness / tot).toFixed(2));
    }

    const rgbArr = new HslColor([this.hue, 1, 0.5])
      .toRgb()
      .toArray()
      .slice(0, 3)
      .map((v, i) => {
        if (i === 3) return v;
        return Number(((v / 255) * (1 - whiteness - blackness) + whiteness) * 255);
      }) as [number, number, number, number];

    return new RgbColor(rgbArr);
  }

  toHex() {
    return this.toRgb().toHex();
  }

  toHsl() {
    return this.toRgb().toHsl();
  }
}
