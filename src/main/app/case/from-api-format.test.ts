import { Checkbox } from './case';
import { CaseData, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<Record<keyof CaseData, string | null>> = {
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    marriageIsSameSexCouple: YesOrNo.YES,
    applicant2Gender: Gender.MALE,
    applicant1Gender: Gender.MALE,
    applicant1ScreenHasMarriageBroken: YesOrNo.YES,
    helpWithFeesReferenceNumber: 'HWF-ABC-123',
    applicant1AgreedToReceiveEmails: YesOrNo.YES,
    applicant1ContactDetailsConfidential: 'keep',
    applicant1KnowsApplicant2EmailAddress: YesOrNo.NO,
    applicant1WantsToHavePapersServedAnotherWay: null,
    applicant1LanguagePreferenceWelsh: YesOrNo.YES,
    applicant2ContactDetailsConfidential: 'keep',
    prayerHasBeenGiven: YesOrNo.YES,
    statementOfTruth: YesOrNo.YES,
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(results as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      sameSex: Checkbox.Checked,
      gender: Gender.MALE,
      screenHasUnionBroken: YesOrNo.YES,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.YES,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
      applicant2AddressPrivate: YesOrNo.YES,
      iWantToHavePapersServedAnotherWay: undefined,
      englishOrWelsh: 'welsh',
      iBelieveApplicationIsTrue: 'checked',
      iConfirmPrayer: 'checked',
    });
  });

  test('convert results including the union date from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat({
      ...results,
      marriageDate: '2000-09-02',
      dateSubmitted: '2021-01-01',
    } as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      gender: Gender.MALE,
      sameSex: Checkbox.Checked,
      screenHasUnionBroken: YesOrNo.YES,
      relationshipDate: {
        day: '2',
        month: '9',
        year: '2000',
      },
      iBelieveApplicationIsTrue: 'checked',
      iConfirmPrayer: 'checked',
      englishOrWelsh: 'welsh',
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.YES,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
      applicant2AddressPrivate: YesOrNo.YES,
      iWantToHavePapersServedAnotherWay: undefined,
      dateSubmitted: new Date('2021-01-01'),
    });
  });

  test('ignores empty addresses', async () => {
    const nfdivFormat = fromApiFormat({
      marriageDate: undefined,
      dateSubmitted: '2021-01-01',
    } as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      relationshipDate: undefined,
      dateSubmitted: new Date('2021-01-01'),
    });
  });

  describe('converting your address between UK and international', () => {
    test('converts to UK format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1HomeAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          PostTown: 'Town',
          County: 'County',
          PostCode: 'Postcode',
        },
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant1Address1: 'Line 1',
        applicant1Address2: 'Line 2',
        applicant1AddressTown: 'Town',
        applicant1AddressCounty: 'County',
        applicant1AddressPostcode: 'Postcode',
      });
    });

    test('converts to UK format for applicant2', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant2HomeAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          PostTown: 'Town',
          County: 'County',
          PostCode: 'Postcode',
        },
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant2Address1: 'Line 1',
        applicant2Address2: 'Line 2',
        applicant2AddressTown: 'Town',
        applicant2AddressCounty: 'County',
        applicant2AddressPostcode: 'Postcode',
      });
    });

    test('converts to an international format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1HomeAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          AddressLine3: 'Line 3',
          PostTown: 'Town',
          County: 'State',
          PostCode: 'Zip code',
          Country: 'Country',
        },
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({});
    });
  });

  test('adds read only fields', () => {
    expect(
      fromApiFormat({
        payments: [
          {
            id: 'mock-payment',
          },
        ],
      } as unknown as CaseData)
    ).toStrictEqual({
      payments: [
        {
          id: 'mock-payment',
        },
      ],
    });
  });
});
