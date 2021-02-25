import { CaseData } from '@hmcts/nfdiv-case-definition';
import { invert } from 'lodash';

import { Case, Checkbox, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

const fields = {
  ...invert(formFieldsToCaseMapping),
  D8MarriageIsSameSexCouple: (data): Partial<Case> => ({
    appliesToYou: { sameSex: data.D8MarriageIsSameSexCouple === YesOrNo.Yes ? Checkbox.Checked : Checkbox.Unchecked },
  }),
  D8MarriageDate: (data): Partial<Case> => ({
    relationshipDate: fromApiDate(data.D8MarriageDate),
  }),
};

const fromApiDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return { year, month, day };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
