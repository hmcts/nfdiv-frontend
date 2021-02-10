export type Validator = (value: string) => void | string;

export const isFieldFilledIn: Validator = value => {
  if (!value) {
    return 'required';
  }
};
