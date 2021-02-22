import { ApiCase } from './CaseApi';
import { Gender, YesOrNo } from './case';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results = {
    sameSex: 'checked',
    partnerGender: Gender.Male,
    relationshipDate: '',
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<ApiCase>);

    expect(apiFormat).toStrictEqual({
      D8MarriageIsSameSexCouple: YesOrNo.Yes,
      D8InferredRespondentGender: Gender.Male,
      D8InferredPetitionerGender: Gender.Male,
      D8MarriageDate: '',
    });
  });
});
