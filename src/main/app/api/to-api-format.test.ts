import { ApiCase } from './CaseApi';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results = {
    sameSex: 'checked',
    partnerGender: 'Male',
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<ApiCase>);

    expect(apiFormat).toStrictEqual({
      D8MarriageIsSameSexCouple: 'YES',
      D8InferredRespondentGender: 'Male',
      D8InferredPetitionerGender: 'Male',
    });
  });
});
