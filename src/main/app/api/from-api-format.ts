import { ApiCase } from './CaseApi';
import { YesOrNo, caseToNFDivFields } from './case';

const fields = {
  D8MarriageIsSameSexCouple: data => ({
    sameSex: data.D8MarriageIsSameSexCouple === YesOrNo.Yes ? 'checked' : '',
  }),
};

export function fromApiFormat(data: ApiCase): ApiCase {
  const result = {
    divorceOrDissolution: data.divorceOrDissolution,
  };

  for (const field of Object.keys(data)) {
    if (typeof fields[field] === 'function') {
      Object.assign(result, fields[field](data));
    } else {
      const property = Object.keys(caseToNFDivFields).find(key => caseToNFDivFields[key] === field);
      if (property) {
        result[property] = data[field];
      }
    }
  }

  return result as ApiCase;
}
