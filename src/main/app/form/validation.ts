
export const isFieldFilledIn = (value: string): void | string => {
  if (!value) {
    return 'required';
  }
};
