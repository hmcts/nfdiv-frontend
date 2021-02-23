import { invert } from 'lodash';

import { ApiCase } from './CaseApi';
import { Case, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

const fields = {
  ...invert(formFieldsToCaseMapping),
  D8MarriageIsSameSexCouple: data => ({
    sameSex: data.D8MarriageIsSameSexCouple === YesOrNo.Yes ? 'checked' : '',
  }),
  D8MarriageDate: data => ({
    relationshipDate: fromApiDate(data.D8MarriageDate),
  }),
  D8HelpWithFeesReferenceNumber: 'helpWithFeesRefNo',
};

const fromApiDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return { year, month, day };
};

export const fromApiFormat = (data: ApiCase): Case => formatCase(fields, data);
