export const flattenObject = (
  obj: any,
  separators: string | string[] = '.',
  prefix = '',
): Record<string, string> => {
  if (!obj) return {};
  let flatten = {};
  const _separators = [...separators];
  const separator = Array.isArray(_separators) ? _separators.shift() : _separators;

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}${separator}${key}` : key;

    if (typeof value === 'object') {
      Object.assign(flatten, flattenObject(value, _separators, newKey));
    } else {
      flatten = { ...flatten, [newKey]: value };
    }
  }
  return flatten;
};
