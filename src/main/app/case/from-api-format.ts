import { CaseData } from '@hmcts/nfdiv-case-definition';
import { invert } from 'lodash';

import { Case, Checkbox, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

const fields = {
  ...invert(formFieldsToCaseMapping),
  D8MarriageIsSameSexCouple: (data: Partial<CaseData>): Partial<Case> => ({
    sameSex: data.D8MarriageIsSameSexCouple === YesOrNo.Yes ? Checkbox.Checked : Checkbox.Unchecked,
  }),
  D8MarriageDate: (data: Partial<CaseData>): Partial<Case> => ({
    relationshipDate: fromApiDate(data.D8MarriageDate),
  }),
};

const fromApiDate = (date = '') => {
  const [year = '', month = '', day = ''] = date.split('-');
  return { year, month, day };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
