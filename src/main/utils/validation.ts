
export const isFieldFilledIn = (value: string): (boolean | string)[] => {
  return [!!value, 'required'];
};
