import { Case, Gender, YesOrNo } from './case';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results = {
    sameSex: 'checked',
    partnerGender: Gender.Male,
    relationshipDate: { year: '2000', month: '2', day: '7' },
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      D8MarriageIsSameSexCouple: YesOrNo.Yes,
      D8InferredRespondentGender: Gender.Male,
      D8InferredPetitionerGender: Gender.Male,
      D8MarriageDate: '2000-02-07',
    });
  });

  test("Should not send a date if it's not set", async () => {
    const input = { ...results } as Partial<Case>;
    delete input.relationshipDate;
    const apiFormat = toApiFormat(input);

    expect(apiFormat).toStrictEqual({
      D8MarriageIsSameSexCouple: YesOrNo.Yes,
      D8InferredRespondentGender: Gender.Male,
      D8InferredPetitionerGender: Gender.Male,
    });
  });
});
