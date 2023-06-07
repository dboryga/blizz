import { ValueOf } from 'ts-essentials';

export const NATIVE_ELEMENT_STATE = {
  Focus: 'focus',
  Hover: 'hover',
} as const;
export type NativeElementState = ValueOf<typeof NATIVE_ELEMENT_STATE>;

export const NATIVE_INPUT_STATE = {
  ...NATIVE_ELEMENT_STATE,
  Enabled: 'enabled',
  Disabled: 'disabled',
  Valid: 'valid',
  Invalid: 'invalid',
  Optional: 'optional',
  Required: 'required',
} as const;
export type NativeInputState = ValueOf<typeof NATIVE_INPUT_STATE>;

export const NATIVE_CHECKBOX_STATE = {
  ...NATIVE_ELEMENT_STATE,
  ...NATIVE_INPUT_STATE,
  Checked: 'checked',
} as const;
export type NativeCheckboxState = ValueOf<typeof NATIVE_CHECKBOX_STATE>;

export const NATIVE_LINK_STATE = {
  ...NATIVE_ELEMENT_STATE,
  Active: 'active',
  Visited: 'visited',
} as const;
export type NativeLinkState = ValueOf<typeof NATIVE_LINK_STATE>;

export const ANY_NATIVE_STATE = {
  ...NATIVE_ELEMENT_STATE,
  ...NATIVE_INPUT_STATE,
  ...NATIVE_CHECKBOX_STATE,
  ...NATIVE_LINK_STATE,
} as const;
export type AnyNativeState = ValueOf<typeof ANY_NATIVE_STATE>;
