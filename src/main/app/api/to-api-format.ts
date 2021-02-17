import { ApiCase } from './CaseApi';
import { Case, Gender, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';

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
};

export const toApiFormat = (data: Partial<Case>): ApiCase => formatCase(fields, data);
