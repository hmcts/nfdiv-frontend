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
  D8DerivedPetitionerHomeAddress: data => {
    if (!data.D8DerivedPetitionerHomeAddress) {
      return {};
    }

    const addressParts = data.D8DerivedPetitionerHomeAddress.split('\n');
    if (addressParts.length !== 5) {
      return {
        yourFullAddress: data.D8DerivedPetitionerHomeAddress.replace('international_format', ''),
        myAddressIsInternational: Checkbox.Checked,
      };
    }

    const [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode] = addressParts;
    return {
      yourAddress1,
      yourAddress2,
      yourAddressTown,
      yourAddressCounty,
      yourAddressPostcode,
    };
  },
  PetitionerAgreedToReceiveEmails: data => ({
    agreeToReceiveEmails: data.PetitionerAgreedToReceiveEmails === YesOrNo.Yes ? Checkbox.Checked : Checkbox.Unchecked,
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
