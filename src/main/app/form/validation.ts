export type Validator = (value: string | Record<string, string>) => void | string;
export type DateValidator = (value: Record<string, string>) => void | string;

export const isFieldFilledIn: Validator = value => {
  if (!value) {
    return 'required';
  }
};

export const areFieldsFilledIn: DateValidator = fields => {
  for (const field in fields) {
    if (!fields[field]) {
      return 'required';
    }
  }
};

export const isDateInputValid: DateValidator = date => {
  const invalid = 'invalidDate';
  for (const value in date) {
    if (isNaN(+date[value])) {
      return invalid;
    }
  }

  const year = parseInt(date.year, 10);
  const month = parseInt(date.month, 10);
  const day = parseInt(date.day, 10);
  if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
    return invalid;
  }
};

export const isFutureDate: DateValidator = date => {
  const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
  if (new Date() < enteredDate) {
    return 'invalidDateInFuture';
  }
};

export const isLessThanAYear: DateValidator = date => {
  const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  if (!(enteredDate < oneYearAgo)) {
    return 'lessThanAYear';
  }
};
