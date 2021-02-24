import { ApiCase } from './CaseApi';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results = {
    divorceOrDissolution: 'divorce',
    D8MarriageIsSameSexCouple: 'YES',
    D8InferredRespondentGender: 'Male',
    D8InferredPetitionerGender: 'Male',
    D8ScreenHasMarriageBroken: 'YES',
    D8HelpWithFeesReferenceNumber: 'HWF-ABC-123',
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(results as ApiCase);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: 'divorce',
      sameSex: 'checked',
      gender: 'Male',
      screenHasUnionBroken: 'YES',
      helpWithFeesRefNo: 'HWF-ABC-123',
    });
  });
});
