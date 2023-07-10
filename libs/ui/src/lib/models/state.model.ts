import { ValueOf } from 'ts-essentials';

export const NativeElementState = {
  Hover: 'hover',
  Focus: 'focus',
  FocusVisible: 'focusVisible',
  FocusWithin: 'focusWithin',
} as const;
export type NativeElementState = ValueOf<typeof NativeElementState>;

export const NativeButtonState = {
  ...NativeElementState,
  Disabled: 'disabled',
} as const;
export type NativeButtonState = ValueOf<typeof NativeButtonState>;

export const NativeInputState = {
  ...NativeButtonState,
  Invalid: 'invalid',
  Required: 'required',
} as const;
export type NativeInputState = ValueOf<typeof NativeInputState>;

export const NativeCheckboxState = {
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
  ...NativeButtonState,
  ...NativeInputState,
  ...NativeCheckboxState,
  ...NativeLinkState,
} as const;
export type AnyNativeState = ValueOf<typeof AnyNativeState>;
