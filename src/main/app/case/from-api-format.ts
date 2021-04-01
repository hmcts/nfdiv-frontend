import { invert } from 'lodash';

import { Case, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, YesOrNo } from './definition';
import { fromApi as formatAddress } from './formatter/address';

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
  marriageIsSameSexCouple: data => ({
    sameSex: data.marriageIsSameSexCouple === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked,
  }),
  marriageDate: data => ({
    relationshipDate: fromApiDate(data.marriageDate),
  }),
  languagePreferenceWelsh: data => ({
    englishOrWelsh:
      data.languagePreferenceWelsh === YesOrNo.YES ? LanguagePreference.Welsh : LanguagePreference.English,
  }),
  derivedPetitionerHomeAddress: formatAddress,
  petitionerAgreedToReceiveEmails: data => ({
    agreeToReceiveEmails: data.petitionerAgreedToReceiveEmails === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked,
  }),
  petitionerKnowsRespondentsAddress: data => ({
    doNotKnowRespondentEmailAddress:
      data.petitionerKnowsRespondentsAddress === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked,
  }),
};

const fromApiDate = date => {
  if (!date) {
    return;
  }

  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
