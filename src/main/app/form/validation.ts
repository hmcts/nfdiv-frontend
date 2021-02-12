export type Validator = (value: string | Record<string, never>) => void | string;
export type DateValidator = (value: Record<string, never>) => void | string;

export const isFieldFilledIn: Validator = value => {
  if (!value) {
    return 'required';
  }
};

export const isDatesFilledIn: DateValidator = fields => {
  for (const field in fields) {
    if (!fields[field]) {
      return 'required';
    }
  }
};

export const isFutureDate: DateValidator = date => {
  const enteredDate = new Date(date.year, date.month, date.day);
  if (new Date() < enteredDate) {
    return 'invalidDate';
  }
};

export const isDateInputNumeric: DateValidator = date => {
  for (const value in date) {
    if (isNaN(date[value])) {
      return 'invalidInput';
    }
  }
};
