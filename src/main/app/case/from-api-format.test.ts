import { CaseData } from '@hmcts/nfdiv-case-definition';

import { CaseType, Checkbox, Gender, YesOrNo } from './case';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results = {
    divorceOrDissolution: 'divorce',
    D8MarriageIsSameSexCouple: 'YES',
    D8InferredRespondentGender: 'male',
    D8InferredPetitionerGender: 'male',
    D8ScreenHasMarriageBroken: 'YES',
    D8HelpWithFeesReferenceNumber: 'HWF-ABC-123',
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat((results as unknown) as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: CaseType.Divorce,
      sameSex: Checkbox.Checked,
      gender: Gender.Male,
      screenHasUnionBroken: YesOrNo.Yes,
      helpWithFeesRefNo: 'HWF-ABC-123',
    });
  });

  test('convert results including the union date from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(({ ...results, D8MarriageDate: '2000-12-31' } as unknown) as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: CaseType.Divorce,
      gender: Gender.Male,
      sameSex: Checkbox.Checked,
      screenHasUnionBroken: YesOrNo.Yes,
      relationshipDate: {
        day: '31',
        month: '12',
        year: '2000',
      },
      helpWithFeesRefNo: 'HWF-ABC-123',
    });
  });
});
