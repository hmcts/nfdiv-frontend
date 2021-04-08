import { Case, Checkbox } from './case';
import { ConfidentialAddress, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results: Partial<Case> = {
    gender: Gender.MALE,
    sameSex: Checkbox.Checked,
    relationshipDate: { year: '1900', month: '1', day: '4' },
    helpPayingNeeded: YesOrNo.YES,
    alreadyAppliedForHelpPaying: YesOrNo.YES,
    helpWithFeesRefNo: 'HWF-123-ABC',
    agreeToReceiveEmails: Checkbox.Checked,
    addressPrivate: YesOrNo.YES,
    iWantToHavePapersServedAnotherWay: Checkbox.Checked,
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      marriageIsSameSexCouple: YesOrNo.YES,
      inferredRespondentGender: Gender.MALE,
      inferredPetitionerGender: Gender.MALE,
      marriageDate: '1900-01-04',
      helpWithFeesNeedHelp: YesOrNo.YES,
      helpWithFeesAppliedForFees: YesOrNo.YES,
      helpWithFeesReferenceNumber: 'HWF-123-ABC',
      petitionerAgreedToReceiveEmails: YesOrNo.YES,
      petitionerContactDetailsConfidential: ConfidentialAddress.KEEP,
      petitionerWantsToHavePapersServedAnotherWay: YesOrNo.YES,
    });
  });

  test('handles invalid data correctly', async () => {
    const apiFormat = toApiFormat({
      helpWithFeesRefNo: '123-ABC',
      relationshipDate: { year: '123' },
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      helpWithFeesReferenceNumber: '',
      marriageDate: '',
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
        inferredPetitionerGender: expected.petitioner,
        inferredRespondentGender: expected.respondent,
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
        derivedPetitionerHomeAddress: 'Line 1\nLine 2\nTown\nCounty\nPostcode',
      });
    });

    test('converts to an international format', () => {
      const mockInternationalAddress = 'Parliament House, Parliament Dr, Canberra ACT 2600, Australia';
      const apiFormat = toApiFormat(({
        ...results,
        isInternationalAddress: YesOrNo.YES,
        yourInternationalAddress: mockInternationalAddress,
      } as unknown) as Partial<Case>);

      expect(apiFormat).toMatchObject({
        derivedPetitionerHomeAddress: mockInternationalAddress,
      });
    });
  });
});
