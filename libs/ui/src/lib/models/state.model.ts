import { ValueOf } from 'ts-essentials';

export const NativeElementState = {
  Focus: 'focus',
  Hover: 'hover',
} as const;
export type NativeElementState = ValueOf<typeof NativeElementState>;

export const NativeInputState = {
  ...NativeElementState,
  Disabled: 'disabled',
  Invalid: 'invalid',
  Required: 'required',
} as const;
export type NativeInputState = ValueOf<typeof NativeInputState>;

export const NativeCheckboxState = {
  ...NativeElementState,
  ...NativeInputState,
  Checked: 'checked',
} as const;
export type NativeCheckboxState = ValueOf<typeof NativeCheckboxState>;

export const NativeLinkState = {
  ...NativeElementState,
  Active: 'active',
  Visited: 'visited',
} as const;
export type NativeLinkState = ValueOf<typeof NativeLinkState>;

export const AnyNativeState = {
  ...NativeElementState,
  ...NativeInputState,
  ...NativeCheckboxState,
  ...NativeLinkState,
} as const;
export type AnyNativeState = ValueOf<typeof AnyNativeState>;
