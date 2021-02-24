import { invert } from 'lodash';

import { ApiCase } from './CaseApi';
import { Case, Checkbox, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

const fields = {
  ...invert(formFieldsToCaseMapping),
  D8MarriageIsSameSexCouple: data => ({
    sameSex: data.D8MarriageIsSameSexCouple === YesOrNo.Yes ? Checkbox.Checked : Checkbox.Unchecked,
  }),
  D8MarriageDate: data => ({
    relationshipDate: fromApiDate(data.D8MarriageDate),
  }),
};

const fromApiDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return { year, month, day };
};

export const fromApiFormat = (data: ApiCase): Case => formatCase(fields, data);
