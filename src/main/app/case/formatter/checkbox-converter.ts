import { Checkbox } from '../case.js';
import { YesOrNo } from '../definition.js';

export const checkboxConverter = (value: string | undefined): Checkbox | undefined => {
  if (!value) {
    return undefined;
  }

  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};
