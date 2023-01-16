export const firstLetterLower = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);

export const firstLetterUpper = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const separateCamelCase = (str: string, separator: string) =>
  str.replace(/[A-Z]/g, (word) => `${separator}${word.toLowerCase()}`);

// FROM CAMEL
export const camelToPascalCase = firstLetterUpper;

export const camelToSnakeCase = (str: string) => separateCamelCase(str, '_');

export const camelToKebabCase = (str: string) => separateCamelCase(str, '-');

// FROM PASCAL
export const pascalToCamelCase = firstLetterLower;

export const pascalToSnakeCase = (str: string) =>
  camelToSnakeCase(pascalToCamelCase(str));

export const pascalToKebabCase = (str: string) =>
  camelToKebabCase(pascalToCamelCase(str));

// FROM SNAKE
export const snakeToKebabCase = (str: string) => str.replace(/_/g, '-');

export const snakeToPascalCase = (str: string) =>
  str.split('_').map(firstLetterUpper).join('');

export const snakeToCamelCase = (str: string) =>
  pascalToCamelCase(snakeToPascalCase(str));

// FROM KEBAB
export const kebabToSnakeCase = (str: string) => str.replace(/-/g, '_');

export const kebabToPascalCase = (str: string) =>
  str.split('-').map(firstLetterUpper).join('');

export const kebabToCamelCase = (str: string) =>
  pascalToCamelCase(kebabToPascalCase(str));
