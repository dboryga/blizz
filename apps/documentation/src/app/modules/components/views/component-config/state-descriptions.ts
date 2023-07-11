import { AnyNativeState } from '@blizz-ui/components';

export const NATIVE_STATE_DESCRIPTIONS = {
  [AnyNativeState.Hover]: 'The element is currently being hovered over by the user.',
  [AnyNativeState.Focus]: 'The element currently has focus.',
  [AnyNativeState.FocusVisible]:
    'The element currently has keyboard focus and is in a visible or interactive state.',
  [AnyNativeState.FocusWithin]:
    'An ancestor element of the focused element currently has keyboard focus.',
  [AnyNativeState.Disabled]: 'The element is currently disabled and cannot be interacted with.',
  [AnyNativeState.Invalid]: 'The element has an invalid value or state.',
  [AnyNativeState.Required]: 'The element has a required value that needs to be filled in.',
  [AnyNativeState.Checked]: 'The element is currently checked or selected.',
  [AnyNativeState.Active]: 'The element is currently being activated or pressed.',
  [AnyNativeState.Visited]: 'The link has been visited by the user.',
} as const;

export const CUSTOM_STATE_DESCRIPTIONS = {
  expansionPanel_expanded: 'The expansion panel is currently expanded.',
  expansionPanel_triggerHover:
    'The trigger element of the expansion panel is currently being hovered over by the user.',

  chip_selected: 'The chip is currently selected.',
  chip_selectable: 'The chip can be selected by the user.',

  textField_empty: 'Indicates that has no value entered in the input field.',
  textField_labelFloating:
    'Relates only to text field components with "labelPosition" set to "floating". When the text field component has the "labelFloating" state, the label appears floating above the input field. This state is triggered when the input field is focused, or when it has a non-empty value. It provides a visual indication to the user that the input field has content or is being interacted with.',
} as const;
