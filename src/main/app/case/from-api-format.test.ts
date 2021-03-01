import { CaseData, Gender, LegalProcessEnum } from '@hmcts/nfdiv-case-definition';

import { Checkbox, Gender as GenderLocal, YesOrNo } from './case';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<CaseData> = {
    D8legalProcess: LegalProcessEnum.DIVORCE,
    D8MarriageIsSameSexCouple: 'YES',
    D8InferredRespondentGender: Gender.MALE,
    D8InferredPetitionerGender: Gender.MALE,
    D8ScreenHasMarriageBroken: 'YES',
    D8MarriageDate: '',
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat((results as unknown) as CaseData);

    expect(nfdivFormat).toStrictEqual({
      sameSex: Checkbox.Checked,
      gender: GenderLocal.Male,
      screenHasUnionBroken: YesOrNo.Yes,
      relationshipDate: undefined,
    });
  });

  test('convert results including the union date from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(({ ...results, D8MarriageDate: '2000-12-31' } as unknown) as CaseData);

    expect(nfdivFormat).toStrictEqual({
      sameSex: Checkbox.Checked,
      gender: GenderLocal.Male,
      screenHasUnionBroken: YesOrNo.Yes,
      relationshipDate: {
        day: '31',
        month: '12',
        year: '2000',
      },
    });
  });
});
