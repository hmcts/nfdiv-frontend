
export const isFieldFilledIn = (value: string): boolean | string => {
  return value ? true : 'required';
};
