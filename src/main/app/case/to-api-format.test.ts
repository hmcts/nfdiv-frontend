import { ApiCase } from './CaseApi';
import { Checkbox, Gender, YesOrNo } from './case';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results = {
    sameSex: Checkbox.Checked,
    partnerGender: Gender.Male,
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
});
