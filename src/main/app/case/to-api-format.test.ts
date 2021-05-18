import { Case, Checkbox } from './case';
import { ConfidentialAddress, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { OrNull, toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results: OrNull<Partial<Case>> = {
    gender: Gender.MALE,
    sameSex: Checkbox.Checked,
    relationshipDate: { year: '1900', month: '1', day: '4' },
    helpPayingNeeded: YesOrNo.YES,
    alreadyAppliedForHelpPaying: YesOrNo.YES,
    helpWithFeesRefNo: 'HWF-123-ABC',
    agreeToReceiveEmails: Checkbox.Checked,
    doNotKnowApplicant2EmailAddress: Checkbox.Checked,
    addressPrivate: YesOrNo.YES,
    knowApplicant2Address: YesOrNo.NO,
    iWantToHavePapersServedAnotherWay: null,
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      marriageIsSameSexCouple: YesOrNo.YES,
      inferredApplicant2Gender: Gender.MALE,
      inferredApplicant1Gender: Gender.MALE,
      marriageDate: '1900-01-04',
      helpWithFeesNeedHelp: YesOrNo.YES,
      helpWithFeesAppliedForFees: YesOrNo.YES,
      helpWithFeesReferenceNumber: 'HWF-123-ABC',
      applicant1AgreedToReceiveEmails: YesOrNo.YES,
      applicant1ContactDetailsConfidential: ConfidentialAddress.KEEP,
      applicant1KnowsApplicant2Address: YesOrNo.NO,
      applicant1KnowsApplicant2EmailAddress: YesOrNo.NO,
      applicant1WantsToHavePapersServedAnotherWay: null,
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
      expected: { applicant1: Gender.FEMALE, applicant2: Gender.MALE },
    },
    {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Unchecked,
      expected: { applicant1: Gender.MALE, applicant2: Gender.FEMALE },
    },
    {
      gender: Gender.MALE,
      sameSex: Checkbox.Checked,
      expected: { applicant1: Gender.MALE, applicant2: Gender.MALE },
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      gender: Gender.MALE,
      sameSex: Checkbox.Unchecked,
      expected: { applicant1: Gender.MALE, applicant2: Gender.FEMALE },
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      gender: Gender.FEMALE,
      sameSex: Checkbox.Unchecked,
      expected: { applicant1: Gender.FEMALE, applicant2: Gender.MALE },
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      gender: Gender.FEMALE,
      sameSex: Checkbox.Checked,
      expected: { applicant1: Gender.FEMALE, applicant2: Gender.FEMALE },
    },
  ])(
    'gets the correct inferred gender of applicant 1 and applicant 2: %o',
    ({ divorceOrDissolution = DivorceOrDissolution.DIVORCE, gender, sameSex, expected }) => {
      expect(toApiFormat({ divorceOrDissolution, gender, sameSex } as Partial<Case>)).toMatchObject({
        inferredApplicant1Gender: expected.applicant1,
        inferredApplicant2Gender: expected.applicant2,
      });
    }
  );

  test('converts your address to match API format', () => {
    const apiFormat = toApiFormat({
      ...results,
      yourAddress1: 'Line 1',
      yourAddress2: 'Line 2',
      yourAddress3: '',
      yourAddressTown: 'Town',
      yourAddressCounty: 'County',
      yourAddressPostcode: 'Postcode',
      yourAddressCountry: 'UK',
    } as unknown as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant1HomeAddress: {
        AddressLine1: 'Line 1',
        AddressLine2: 'Line 2',
        AddressLine3: '',
        PostTown: 'Town',
        County: 'County',
        PostCode: 'Postcode',
        Country: 'UK',
      },
    });
  });
});
