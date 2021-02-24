import { ApiCase } from './CaseApi';
import { Case, CaseType, Checkbox, Gender, YesOrNo } from './case';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results = {
    gender: Gender.Male,
    sameSex: Checkbox.Checked,
    relationshipDate: { year: '1900', month: '1', day: '4' },
    helpWithFeesRefNo: 'HWF-123-ABC',
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<ApiCase>);

    expect(apiFormat).toStrictEqual({
      D8MarriageIsSameSexCouple: YesOrNo.Yes,
      D8InferredRespondentGender: Gender.Male,
      D8InferredPetitionerGender: Gender.Male,
      D8MarriageDate: '1900-01-04',
      D8HelpWithFeesReferenceNumber: 'HWF-123-ABC',
    });
  });

  test('handles invalid data correctly', async () => {
    const apiFormat = toApiFormat({
      helpWithFeesRefNo: '123-ABC',
      relationshipDate: { year: '123' },
    } as Partial<ApiCase>);

    expect(apiFormat).toMatchObject({
      D8HelpWithFeesReferenceNumber: '',
      D8MarriageDate: '',
    });
  });

  test.each([
    {
      gender: Gender.Male,
      sameSex: Checkbox.Unchecked,
      expected: { petitioner: Gender.Female, respondent: Gender.Male },
    },
    {
      gender: Gender.Female,
      sameSex: Checkbox.Unchecked,
      expected: { petitioner: Gender.Male, respondent: Gender.Female },
    },
    {
      gender: Gender.Male,
      sameSex: Checkbox.Checked,
      expected: { petitioner: Gender.Male, respondent: Gender.Male },
    },
    {
      divorceOrDissolution: CaseType.Dissolution,
      gender: Gender.Male,
      sameSex: Checkbox.Unchecked,
      expected: { petitioner: Gender.Male, respondent: Gender.Female },
    },
    {
      divorceOrDissolution: CaseType.Dissolution,
      gender: Gender.Female,
      sameSex: Checkbox.Unchecked,
      expected: { petitioner: Gender.Female, respondent: Gender.Male },
    },
    {
      divorceOrDissolution: CaseType.Dissolution,
      gender: Gender.Female,
      sameSex: Checkbox.Checked,
      expected: { petitioner: Gender.Female, respondent: Gender.Female },
    },
  ])(
    'gets the correct inferred gender of the petitioner and respondent: %o',
    ({ divorceOrDissolution = CaseType.Divorce, gender, sameSex, expected }) => {
      expect(toApiFormat({ divorceOrDissolution, gender, sameSex } as Partial<Case>)).toMatchObject({
        D8InferredPetitionerGender: expected.petitioner,
        D8InferredRespondentGender: expected.respondent,
      });
    }
  );
});
