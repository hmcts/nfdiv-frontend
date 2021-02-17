import { ApiCase, Case, Gender, YesOrNo } from './CaseApi';

const fields = {
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

export function toApiFormat(data: Partial<Case>): ApiCase {
  const result = {};

  for (const field of Object.keys(data)) {
    if (typeof fields[field] === 'function') {
      Object.assign(result, fields[field](data));
    } else {
      result[field] = fields[field];
    }
  }

  return result as ApiCase;
}

// TODO create separate definitions and plug the ApiCase structure into CaseApi and the Case structure into the session
// move the ApiCase definition to CaseApi rather than here and move the Case definition out of CaseApi to somewhere else
