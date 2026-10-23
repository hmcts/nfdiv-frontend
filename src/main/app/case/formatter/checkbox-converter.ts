import { Checkbox } from '../case.js';
import { YesOrNo } from '../definition.js';

export const yesNoToCheckbox = (value: string | undefined): Checkbox | undefined => {
  if (!value) {
    return undefined;
  }

  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};

export const checkboxToYesNo = (value: string | undefined): YesOrNo | null => {
  if (value === null) {
    return null;
  }

  return value === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
};
