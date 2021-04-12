import { isInvalidHelpWithFeesRef } from '../form/validation';

import { Case, CaseDate, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, ConfidentialAddress, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { theirAddressToApi, yourAddressToApi } from './formatter/address';

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => Partial<CaseData>)>>;

const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,
  sameSex: data => ({
    marriageIsSameSexCouple: data.sameSex === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO,
  }),
  gender: data => {
    // Petitioner makes the request
    let inferredPetitionerGender = data.gender;

    // Respondent receives the request
    let inferredRespondentGender = data.gender;

    if (data.sameSex !== Checkbox.Checked) {
      if (data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) {
        inferredPetitionerGender = data.gender;
        inferredRespondentGender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
      } else {
        inferredPetitionerGender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
        inferredRespondentGender = data.gender;
      }
    }

    return { inferredPetitionerGender, inferredRespondentGender };
  },
  relationshipDate: (data: Case) => ({
    marriageDate: toApiDate(data.relationshipDate),
  }),
  helpWithFeesRefNo: (data: Case) => ({
    helpWithFeesReferenceNumber: !isInvalidHelpWithFeesRef(data.helpWithFeesRefNo) ? data.helpWithFeesRefNo : '',
  }),
  englishOrWelsh: (data: Case) => ({
    languagePreferenceWelsh: data.englishOrWelsh === LanguagePreference.Welsh ? YesOrNo.YES : YesOrNo.NO,
  }),
  yourAddressPostcode: yourAddressToApi,
  yourInternationalAddress: yourAddressToApi,
  agreeToReceiveEmails: (data: Case) => ({
    petitionerAgreedToReceiveEmails: data.agreeToReceiveEmails === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO,
  }),
  addressPrivate: (data: Case) => ({
    petitionerContactDetailsConfidential:
      data.addressPrivate === YesOrNo.YES ? ConfidentialAddress.KEEP : ConfidentialAddress.SHARE,
  }),
  theirAddressPostcode: theirAddressToApi,
  theirInternationalAddress: theirAddressToApi,
  doNotKnowRespondentEmailAddress: (data: Case) => ({
    petitionerKnowsRespondentsAddress:
      data.doNotKnowRespondentEmailAddress === Checkbox.Checked ? YesOrNo.NO : YesOrNo.YES,
  }),
};

const toApiDate = (date: CaseDate | undefined) => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
