import { BlizzPredefinedTheme, BlizzTheme } from '../models';
import { CRYSTAL_THEME } from './crystal.theme';

export const PREDEFINED_THEMES: {
  [key in BlizzPredefinedTheme]: BlizzTheme;
} = {
  [BlizzPredefinedTheme.Crystal]: CRYSTAL_THEME,
};
