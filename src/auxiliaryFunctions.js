const isNumber = (value) => !Number.isNaN(value) && Number.isFinite(value);

const isArray = (array) => Array.isArray(array);

const isString = (string) => (typeof string === 'string');

const arrayEmpty = (array) => {
  if (isArray(array)) {
    return array.length === 0;
  }
};

const stringEmpty = (string) => {
  if (isString(string)) {
    return string.length === 0;
  }
};

const arrayOfNumbers = (array) => {
  if (arrayEmpty(array)) {
    return false;
  }
  for (let i = 0; i < array.length; i += 1) {
    if (!isNumber(array[i])) {
      return false;
    }
  }
  return true;
};

module.exports = { isNumber, arrayOfNumbers, stringEmpty };
