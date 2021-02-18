export type Validator = (value: string | Record<string, string>) => void | string;
export type DateValidator = (value: Record<string, string>) => void | string;

export const isFieldFilledIn: Validator = value => {
  if (!value) {
    return 'required';
  }
};

export const isDatesFilledIn: DateValidator = fields => {
  if (typeof fields !== 'object' || Object.keys(fields).length !== 3) {
    return 'required';
  }

  for (const field in fields) {
    if (!fields[field]) {
      return 'required';
    }
  }
};

export const isDateInputNumeric: DateValidator = date => {
  for (const value in date) {
    if (isNaN(+date[value])) {
      return 'invalidInput';
    }
  }
};

export const isFutureDate: DateValidator = date => {
  const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
  if (new Date() < enteredDate) {
    return 'invalidDate';
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
