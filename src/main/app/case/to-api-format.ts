import { isInvalidHelpWithFeesRef } from '../../app/form/validation';

import { Case, CaseDate, Checkbox, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';
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
    D8HelpWithFeesReferenceNumber:
      data.helpPayingNeeded === YesOrNo.Yes &&
      data.alreadyAppliedForHelpPaying === YesOrNo.Yes &&
      !isInvalidHelpWithFeesRef(data.helpWithFeesRefNo)
        ? data.helpWithFeesRefNo
        : '',
  }),
};

const toApiDate = (date: CaseDate | undefined) => {
  const dateParts = ['year', 'month', 'day'];
  if (!date || !dateParts.every(r => Object.keys(date).includes(r))) {
    return '';
  }
  return dateParts.map(part => date[part]).join('-');
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
