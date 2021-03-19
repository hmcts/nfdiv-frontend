import { invert } from 'lodash';

import { Case, Checkbox, LanguagePreference, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData } from './definition';

const fields = {
  ...invert(formFieldsToCaseMapping),
  D8MarriageIsSameSexCouple: data => ({
    sameSex: data.D8MarriageIsSameSexCouple === YesOrNo.Yes ? Checkbox.Checked : Checkbox.Unchecked,
  }),
  D8MarriageDate: data => ({
    relationshipDate: fromApiDate(data.D8MarriageDate),
  }),
  LanguagePreferenceWelsh: data => ({
    englishOrWelsh:
      data.LanguagePreferenceWelsh === YesOrNo.Yes ? LanguagePreference.Welsh : LanguagePreference.English,
  }),
};

const fromApiDate = date => {
  if (!date) {
    return;
  }

  const [year, month, day] = date.split('-');
  return { year, month, day };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
