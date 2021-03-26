import { Case, Checkbox, YesOrNo } from './case';
import { DivorceOrDissolution, Gender } from './definition';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results: Partial<Case> = {
    gender: Gender.MALE,
    sameSex: Checkbox.Checked,
    relationshipDate: { year: '1900', month: '1', day: '4' },
    helpPayingNeeded: YesOrNo.Yes,
    alreadyAppliedForHelpPaying: YesOrNo.Yes,
    helpWithFeesRefNo: 'HWF-123-ABC',
    agreeToReceiveEmails: Checkbox.Checked,
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      D8MarriageIsSameSexCouple: YesOrNo.Yes,
      D8InferredRespondentGender: Gender.MALE,
      D8InferredPetitionerGender: Gender.MALE,
      D8MarriageDate: '1900-01-04',
      D8HelpWithFeesNeedHelp: YesOrNo.Yes,
      D8HelpWithFeesAppliedForFees: YesOrNo.Yes,
      D8HelpWithFeesReferenceNumber: 'HWF-123-ABC',
      PetitionerAgreedToReceiveEmails: YesOrNo.Yes,
    });
  });

  test('handles invalid data correctly', async () => {
    const apiFormat = toApiFormat({
      helpWithFeesRefNo: '123-ABC',
      relationshipDate: { year: '123' },
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      D8HelpWithFeesReferenceNumber: '',
      D8MarriageDate: '',
    });
  });

  test.each([
    {
      gender: Gender.MALE,
      sameSex: Checkbox.Unchecked,
      expected: { petitioner: Gender.FEMALE, respondent: Gender.MALE },
    },
    {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Unchecked,
      expected: { petitioner: Gender.MALE, respondent: Gender.FEMALE },
    },
    {
      gender: Gender.MALE,
      sameSex: Checkbox.Checked,
      expected: { petitioner: Gender.MALE, respondent: Gender.MALE },
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      gender: Gender.MALE,
      sameSex: Checkbox.Unchecked,
      expected: { petitioner: Gender.MALE, respondent: Gender.FEMALE },
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      gender: Gender.FEMALE,
      sameSex: Checkbox.Unchecked,
      expected: { petitioner: Gender.FEMALE, respondent: Gender.MALE },
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      gender: Gender.FEMALE,
      sameSex: Checkbox.Checked,
      expected: { petitioner: Gender.FEMALE, respondent: Gender.FEMALE },
    },
  ])(
    'gets the correct inferred gender of the petitioner and respondent: %o',
    ({ divorceOrDissolution = DivorceOrDissolution.DIVORCE, gender, sameSex, expected }) => {
      expect(toApiFormat({ divorceOrDissolution, gender, sameSex } as Partial<Case>)).toMatchObject({
        D8InferredPetitionerGender: expected.petitioner,
        D8InferredRespondentGender: expected.respondent,
      });
    }
  );

  describe('converting your address between UK and international', () => {
    test('converts to UK format', () => {
      const apiFormat = toApiFormat(({
        ...results,
        yourAddress1: 'Line 1',
        yourAddress2: 'Line 2',
        yourAddressTown: 'Town',
        yourAddressCounty: 'County',
        yourAddressPostcode: 'Postcode',
      } as unknown) as Partial<Case>);

      expect(apiFormat).toMatchObject({
        D8DerivedPetitionerHomeAddress: 'Line 1\nLine 2\nTown\nCounty\nPostcode',
      });
    });

    test('converts to an international format', () => {
      const apiFormat = toApiFormat(({
        ...results,
        yourAddressPostcode: '',
        myAddressIsInternational: Checkbox.Checked,
      } as unknown) as Partial<Case>);

      expect(apiFormat).toMatchObject({
        D8DerivedPetitionerHomeAddress: 'international_format',
      });
    });
  });
});
