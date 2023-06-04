import { Dictionary } from 'ts-essentials';

export const flattenObject = <_Value, _Object>(
  obj: _Object,
  separator: string = '-',
  prefix: string = '',
): Dictionary<_Value> => {
  if (!obj) return {};
  let flatten = {};

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}${key}` : key;

    if (typeof value === 'object') {
      Object.assign(flatten, flattenObject(value, separator, `${newKey}${separator}`));
    } else {
      flatten = { ...flatten, [newKey]: value };
    }
  }
  return flatten;
};
