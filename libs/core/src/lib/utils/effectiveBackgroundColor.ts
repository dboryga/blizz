export function effectiveBackgroundColor(element: HTMLElement | null | undefined): string | null {
  if (!element) return null;
  let actualColor;

  do {
    const color = getComputedStyle(element).backgroundColor;
    actualColor = isTransparent(color) ? undefined : color;
    element = element?.parentElement ?? null;
  } while (!actualColor && element);

  return actualColor ?? null;
}

export function isTransparent(color: string): boolean {
  return color === 'rgba(0, 0, 0, 0)' || color === 'transparent';
}
