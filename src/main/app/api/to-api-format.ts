import { ApiCase } from './CaseApi';
import { Case, CaseDate, Gender, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

const fields = {
  ...formFieldsToCaseMapping,
  sameSex: data => ({
    D8MarriageIsSameSexCouple: data.sameSex === 'checked' ? YesOrNo.Yes : YesOrNo.No,
  }),
  partnerGender: data => ({
    D8InferredRespondentGender: data.partnerGender,
    D8InferredPetitionerGender:
      (data.partnerGender === Gender.Male && data.sameSex === 'checked') ||
      (data.partnerGender === Gender.Female && data.sameSex !== 'checked')
        ? Gender.Male
        : Gender.Female,
  }),
  relationshipDate: data => ({
    D8MarriageDate: toApiDate(data.relationshipDate),
  }),
};

const toApiDate = (date: CaseDate) => {
  if (!date.year || !date.month || !date.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

export const toApiFormat = (data: Partial<Case>): ApiCase => formatCase(fields, data);
