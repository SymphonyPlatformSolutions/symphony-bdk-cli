export const notEmpty = (value) => value && value.length > 0;

export const validJavaPackage = (value) => value && value.length > 0 && value.indexOf(' ') <= 0 && value.split('.').length === 3;
