import { invert } from 'lodash';

import { ApiCase } from './CaseApi';
import { Case, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

const fields = {
  ...invert(formFieldsToCaseMapping),
  D8MarriageIsSameSexCouple: data => ({
    sameSex: data.D8MarriageIsSameSexCouple === YesOrNo.Yes ? 'checked' : '',
  }),
};

export const fromApiFormat = (data: ApiCase): Case => formatCase(fields, data);
