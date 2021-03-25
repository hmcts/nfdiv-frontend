import { isInvalidHelpWithFeesRef } from '../../app/form/validation';

import { Case, CaseDate, Checkbox, LanguagePreference, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, DivorceOrDissolution, Gender } from './definition';

const fields = {
  ...formFieldsToCaseMapping,
  sameSex: (data: Case) => ({
    D8MarriageIsSameSexCouple: data.sameSex === Checkbox.Checked ? YesOrNo.Yes : YesOrNo.No,
  }),
  gender: (data: Case) => {
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

    return {
      D8InferredPetitionerGender: inferredPetitionerGender,
      D8InferredRespondentGender: inferredRespondentGender,
    };
  },
  relationshipDate: (data: Case) => ({
    D8MarriageDate: toApiDate(data.relationshipDate),
  }),
  helpWithFeesRefNo: (data: Case) => ({
    D8HelpWithFeesReferenceNumber: !isInvalidHelpWithFeesRef(data.helpWithFeesRefNo) ? data.helpWithFeesRefNo : '',
  }),
  englishOrWelsh: (data: Case) => ({
    LanguagePreferenceWelsh: data.englishOrWelsh === LanguagePreference.Welsh ? YesOrNo.Yes : YesOrNo.No,
  }),
  yourAddressPostcode: ({
    yourAddress1,
    yourAddress2,
    yourAddressTown,
    yourAddressCounty,
    yourAddressPostcode,
  }: Case) => ({
    D8DerivedPetitionerHomeAddress: [
      yourAddress1,
      yourAddress2,
      yourAddressTown,
      yourAddressCounty,
      yourAddressPostcode,
    ].join('\n'),
  }),
  agreeToReceiveEmails: (data: Case) => ({
    PetitionerAgreedToReceiveEmails: data.agreeToReceiveEmails === Checkbox.Checked ? YesOrNo.Yes : YesOrNo.No,
  }),
};

const toApiDate = (date: CaseDate | undefined) => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
