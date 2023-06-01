export const flattenObject = (obj: any, separators: string | string[] = '.', prefix = ''): any => {
  if (!obj) return {};
  let flatten = {};
  const separator = Array.isArray(separators) ? separators.shift() : separators;

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}${separator}${key}` : key;

    if (typeof value === 'object') {
      Object.assign(flatten, flattenObject(value, separators, newKey));
    } else {
      flatten = { ...flatten, [newKey]: value };
    }
  }
  return flatten;
};
