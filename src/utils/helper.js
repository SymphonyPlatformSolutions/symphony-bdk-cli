export const notEmpty = (value) => value && value.length > 0;

export const validJavaPackage = (value) => value && value.length > 0 && value.indexOf(' ') <= 0 && value.split('.').length === 4;

export const isUpperCase = (str) => {
  if (!str || !str.length) {
    return false;
  }
  const rgx = new RegExp(/(^[A-Z]|_|[A-Z])/, 'gs');
  const match = str.match(rgx);
  return match && match.length === str.length;
};

export const toKebabCase = str =>
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');
