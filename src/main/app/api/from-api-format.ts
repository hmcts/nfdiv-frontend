import { ApiCase, YesOrNo } from './CaseApi';

const fields = {
  D8MarriageIsSameSexCouple: data => ({
    sameSex: data.D8MarriageIsSameSexCouple === YesOrNo.Yes ? 'checked' : '',
  }),
  D8InferredRespondentGender: 'partnerGender',
};

export function fromApiFormat(data: ApiCase): ApiCase {
  const result = {
    divorceOrDissolution: data.divorceOrDissolution,
  };

  for (const field of Object.keys(data)) {
    if (typeof fields[field] === 'function') {
      Object.assign(result, fields[field](data));
    } else if (fields[field]) {
      result[fields[field]] = data[field];
    }
  }

  return result as ApiCase;
}
