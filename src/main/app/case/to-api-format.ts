import { isInvalidHelpWithFeesRef } from '../../app/form/validation';

import { ApiCase } from './CaseApi';
import { Case, CaseDate, Checkbox, Gender, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

const fields = {
  ...formFieldsToCaseMapping,
  sameSex: data => ({
    D8MarriageIsSameSexCouple: data.sameSex === Checkbox.Checked ? YesOrNo.Yes : YesOrNo.No,
  }),
  partnerGender: data => ({
    D8InferredRespondentGender: data.partnerGender,
    D8InferredPetitionerGender:
      (data.partnerGender === Gender.Male && data.sameSex === Checkbox.Checked) ||
      (data.partnerGender === Gender.Female && data.sameSex !== Checkbox.Checked)
        ? Gender.Male
        : Gender.Female,
  }),
  relationshipDate: data => ({
    D8MarriageDate: toApiDate(data.relationshipDate),
  }),
  helpWithFeesRefNo: (data: Case) => ({
    D8HelpWithFeesReferenceNumber: isInvalidHelpWithFeesRef(data.helpWithFeesRefNo) ? '' : data.helpWithFeesRefNo,
  }),
};

const toApiDate = (date: CaseDate) => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

export const toApiFormat = (data: Partial<Case>): ApiCase => formatCase(fields, data);
