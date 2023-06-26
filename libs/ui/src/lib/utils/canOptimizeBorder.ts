import { Props } from '../models';

export function canOptimizeBorder(
  computedStyles: CSSStyleDeclaration,
  widthProperty: string,
  styleProperty: string,
): boolean {
  const borderWidth = computedStyles.getPropertyValue(widthProperty);
  if (!borderWidth || borderWidth === '0') return false;

  const isSupportedWidth = borderWidth.split(' ').length === 1;
  const borderStyle = computedStyles.getPropertyValue(styleProperty);
  const isSupportedBorderStyle = !borderStyle || borderStyle === <Props.BorderStyle>'solid';

  return isSupportedBorderStyle && isSupportedWidth;
}
