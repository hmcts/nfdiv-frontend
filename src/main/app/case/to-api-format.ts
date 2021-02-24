import { isInvalidHelpWithFeesRef } from '../../app/form/validation';

import { ApiCase } from './CaseApi';
import { Case, CaseDate, CaseType, Checkbox, Gender, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

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
      if (data.divorceOrDissolution === CaseType.Dissolution) {
        inferredPetitionerGender = data.gender;
        inferredRespondentGender = data.gender === Gender.Male ? Gender.Female : Gender.Male;
      } else {
        inferredPetitionerGender = data.gender === Gender.Male ? Gender.Female : Gender.Male;
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
    D8HelpWithFeesReferenceNumber: isInvalidHelpWithFeesRef(data.helpWithFeesRefNo) ? '' : data.helpWithFeesRefNo,
  }),
};

const toApiDate = (date: CaseDate | undefined) => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

export const toApiFormat = (data: Partial<Case>): ApiCase => formatCase(fields, data);
