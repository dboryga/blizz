import { Dictionary } from 'ts-essentials';

export const flattenObject = <_Value, _Object>(
  obj: _Object,
  separator = '-',
  prefix = '',
): Dictionary<_Value> => {
  return _flattenObject(obj, separator, prefix, true);
};

const _flattenObject = <_Value, _Object>(
  obj: _Object,
  separator = '-',
  prefix = '',
  _skipSeparator = false,
): Dictionary<_Value> => {
  if (!obj) return {};
  let flatten = {};

  for (const key in obj) {
    const value = obj[key];
    const actualSeparator = !key.length || _skipSeparator ? '' : separator;
    const newKey = `${prefix ?? ''}${actualSeparator}${key}`;

    if (typeof value === 'object') {
      Object.assign(flatten, _flattenObject(value, separator, newKey, false));
    } else {
      flatten = { ...flatten, [newKey]: value };
    }
  }
  return flatten;
};
