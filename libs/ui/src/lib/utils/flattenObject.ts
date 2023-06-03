export const flattenObject = (obj: any, separator: string, prefix = ''): Record<string, string> => {
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
