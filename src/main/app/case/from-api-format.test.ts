import { Checkbox, LanguagePreference } from './case';
import {
  CaseData,
  ContactDetailsType,
  DissolveDivorce,
  DivorceOrDissolution,
  Gender,
  HowToRespondApplication,
  MarriageFormation,
  ThePrayer,
  YesOrNo,
} from './definition';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<CaseData> = {
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    marriageFormationType: MarriageFormation.SAME_SEX_COUPLE,
    applicant2Gender: Gender.MALE,
    applicant1Gender: Gender.MALE,
    applicant1ScreenHasMarriageBroken: YesOrNo.YES,
    applicant1HWFReferenceNumber: 'HWF-ABC-123',
    applicant1AgreedToReceiveEmails: YesOrNo.YES,
    applicant1ContactDetailsType: ContactDetailsType.PRIVATE,
    applicant1InRefuge: YesOrNo.NO,
    applicant1KnowsApplicant2EmailAddress: YesOrNo.NO,
    applicant1WantsToHavePapersServedAnotherWay: undefined,
    applicant1LanguagePreferenceWelsh: YesOrNo.YES,
    applicant2LanguagePreferenceWelsh: YesOrNo.YES,
    applicant2ContactDetailsType: ContactDetailsType.PUBLIC,
    applicant1PrayerDissolveDivorce: [DissolveDivorce.DISSOLVE_DIVORCE],
    applicant2PrayerDissolveDivorce: [DissolveDivorce.DISSOLVE_DIVORCE],
    applicant1StatementOfTruth: YesOrNo.YES,
    applicant2StatementOfTruth: YesOrNo.YES,
    statementOfTruth: YesOrNo.YES,
    howToRespondApplication: HowToRespondApplication.DISPUTE_DIVORCE,
    coApplicant1StatementOfTruth: YesOrNo.YES,
    coApplicant2StatementOfTruth: YesOrNo.YES,
    applicant1FinalOrderStatementOfTruth: YesOrNo.YES,
    applicant2FinalOrderStatementOfTruth: YesOrNo.YES,
    doesApplicant1WantToApplyForFinalOrder: YesOrNo.YES,
    doesApplicant2WantToApplyForFinalOrder: YesOrNo.YES,
    applicant2AgreedToReceiveEmails: YesOrNo.YES,
    confirmReadPetition: YesOrNo.YES,
    coClarificationResponses: [{ id: '1', value: 'test' }],
    coCannotUploadClarificationDocuments: YesOrNo.YES,
    coIsAdminClarificationSubmitted: YesOrNo.YES,
    app1RfiDraftResponseCannotUploadDocs: YesOrNo.NO,
    app2RfiDraftResponseCannotUploadDocs: YesOrNo.NO,
  };

  const resultsWithSecondaryValues: Partial<Record<keyof CaseData, string | ThePrayer[] | null>> = {
    marriageFormationType: MarriageFormation.OPPOSITE_SEX_COUPLE,
    applicant1LanguagePreferenceWelsh: YesOrNo.NO,
    applicant2LanguagePreferenceWelsh: YesOrNo.NO,
    applicant1KnowsApplicant2EmailAddress: YesOrNo.YES,
    applicant1ContactDetailsType: ContactDetailsType.PUBLIC,
    applicant2ContactDetailsType: ContactDetailsType.PUBLIC,
    applicant1PrayerDissolveDivorce: [],
    applicant2PrayerDissolveDivorce: [],
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(results as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      sameSex: Checkbox.Checked,
      gender: Gender.MALE,
      applicant1ScreenHasUnionBroken: YesOrNo.YES,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.YES,
      applicant1InRefuge: YesOrNo.NO,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
      applicant2AddressPrivate: YesOrNo.NO,
      iWantToHavePapersServedAnotherWay: undefined,
      applicant1EnglishOrWelsh: LanguagePreference.Welsh,
      applicant2EnglishOrWelsh: LanguagePreference.Welsh,
      applicant1StatementOfTruth: Checkbox.Checked,
      applicant2StatementOfTruth: Checkbox.Checked,
      aosStatementOfTruth: Checkbox.Checked,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant2IConfirmPrayer: Checkbox.Checked,
      disputeApplication: YesOrNo.YES,
      coApplicant1StatementOfTruth: Checkbox.Checked,
      coApplicant2StatementOfTruth: Checkbox.Checked,
      applicant1FinalOrderStatementOfTruth: Checkbox.Checked,
      applicant2FinalOrderStatementOfTruth: Checkbox.Checked,
      doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
      doesApplicant2WantToApplyForFinalOrder: Checkbox.Checked,
      applicant2AgreeToReceiveEmails: Checkbox.Checked,
      confirmReadPetition: Checkbox.Checked,
      coCannotUploadClarificationDocuments: Checkbox.Checked,
      coClarificationResponses: 'test',
      coIsAdminClarificationSubmitted: YesOrNo.YES,
      app1RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
      app2RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
    });
  });

  test('Should convert results from api to nfdiv fe format with secondary values', async () => {
    const nfdivFormat = fromApiFormat(resultsWithSecondaryValues as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      sameSex: Checkbox.Unchecked,
      applicant1EnglishOrWelsh: LanguagePreference.English,
      applicant2EnglishOrWelsh: LanguagePreference.English,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Unchecked,
      applicant1AddressPrivate: YesOrNo.NO,
      applicant2AddressPrivate: YesOrNo.NO,
      applicant1IConfirmPrayer: Checkbox.Unchecked,
      applicant2IConfirmPrayer: Checkbox.Unchecked,
    });
  });

  test('convert results including the union date from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat({
      ...results,
      marriageDate: '2000-09-02',
    } as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      gender: Gender.MALE,
      sameSex: Checkbox.Checked,
      applicant1ScreenHasUnionBroken: YesOrNo.YES,
      relationshipDate: {
        day: '2',
        month: '9',
        year: '2000',
      },
      applicant1StatementOfTruth: Checkbox.Checked,
      applicant2StatementOfTruth: Checkbox.Checked,
      aosStatementOfTruth: Checkbox.Checked,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant1EnglishOrWelsh: LanguagePreference.Welsh,
      applicant2EnglishOrWelsh: LanguagePreference.Welsh,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.YES,
      applicant1InRefuge: YesOrNo.NO,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
      applicant2AddressPrivate: YesOrNo.NO,
      iWantToHavePapersServedAnotherWay: undefined,
      disputeApplication: YesOrNo.YES,
      coApplicant1StatementOfTruth: Checkbox.Checked,
      coApplicant2StatementOfTruth: Checkbox.Checked,
      applicant1FinalOrderStatementOfTruth: Checkbox.Checked,
      applicant2FinalOrderStatementOfTruth: Checkbox.Checked,
      doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
      doesApplicant2WantToApplyForFinalOrder: Checkbox.Checked,
      applicant2AgreeToReceiveEmails: Checkbox.Checked,
      confirmReadPetition: Checkbox.Checked,
      coCannotUploadClarificationDocuments: Checkbox.Checked,
      coClarificationResponses: 'test',
      coIsAdminClarificationSubmitted: YesOrNo.YES,
      app1RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
      app2RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
    });
  });

  test('convert results including handling null applicant2LanguagePreferenceWelsh and null howToRespondApplication', async () => {
    const nfdivFormat = fromApiFormat({
      ...results,
      applicant2LanguagePreferenceWelsh: null,
      howToRespondApplication: null,
    } as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      gender: Gender.MALE,
      sameSex: Checkbox.Checked,
      applicant1ScreenHasUnionBroken: YesOrNo.YES,
      applicant1StatementOfTruth: Checkbox.Checked,
      aosStatementOfTruth: Checkbox.Checked,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant2StatementOfTruth: Checkbox.Checked,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant1EnglishOrWelsh: LanguagePreference.Welsh,
      applicant2EnglishOrWelsh: null,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.YES,
      applicant1InRefuge: YesOrNo.NO,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
      applicant2AddressPrivate: YesOrNo.NO,
      iWantToHavePapersServedAnotherWay: undefined,
      disputeApplication: null,
      coApplicant1StatementOfTruth: Checkbox.Checked,
      coApplicant2StatementOfTruth: Checkbox.Checked,
      applicant1FinalOrderStatementOfTruth: Checkbox.Checked,
      applicant2FinalOrderStatementOfTruth: Checkbox.Checked,
      doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
      doesApplicant2WantToApplyForFinalOrder: Checkbox.Checked,
      applicant2AgreeToReceiveEmails: Checkbox.Checked,
      confirmReadPetition: Checkbox.Checked,
      coCannotUploadClarificationDocuments: Checkbox.Checked,
      coClarificationResponses: 'test',
      coIsAdminClarificationSubmitted: YesOrNo.YES,
      app1RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
      app2RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
    });
  });

  test('convert results including handling applicant2LanguagePreferenceWelsh No value and howToRespondApplication No value', async () => {
    const nfdivFormat = fromApiFormat({
      ...results,
      applicant2LanguagePreferenceWelsh: YesOrNo.NO,
      howToRespondApplication: YesOrNo.NO,
    } as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      gender: Gender.MALE,
      sameSex: Checkbox.Checked,
      applicant1ScreenHasUnionBroken: YesOrNo.YES,
      applicant1StatementOfTruth: Checkbox.Checked,
      aosStatementOfTruth: Checkbox.Checked,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant2StatementOfTruth: Checkbox.Checked,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant1EnglishOrWelsh: LanguagePreference.Welsh,
      applicant2EnglishOrWelsh: LanguagePreference.English,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.YES,
      applicant1InRefuge: YesOrNo.NO,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
      applicant2AddressPrivate: YesOrNo.NO,
      iWantToHavePapersServedAnotherWay: undefined,
      disputeApplication: YesOrNo.NO,
      coApplicant1StatementOfTruth: Checkbox.Checked,
      coApplicant2StatementOfTruth: Checkbox.Checked,
      applicant1FinalOrderStatementOfTruth: Checkbox.Checked,
      applicant2FinalOrderStatementOfTruth: Checkbox.Checked,
      doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
      doesApplicant2WantToApplyForFinalOrder: Checkbox.Checked,
      applicant2AgreeToReceiveEmails: Checkbox.Checked,
      confirmReadPetition: Checkbox.Checked,
      coCannotUploadClarificationDocuments: Checkbox.Checked,
      coClarificationResponses: 'test',
      coIsAdminClarificationSubmitted: YesOrNo.YES,
      app1RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
      app2RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
    });
  });

  test('ignores empty addresses', async () => {
    const nfdivFormat = fromApiFormat({
      marriageDate: undefined,
    } as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      relationshipDate: undefined,
    });
  });

  describe('converting your address between UK and international', () => {
    test('converts to UK format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1Address: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          PostTown: 'Town',
          County: 'County',
          PostCode: 'Postcode',
        },
        applicant1AddressOverseas: YesOrNo.NO,
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant1Address1: 'Line 1',
        applicant1Address2: 'Line 2',
        applicant1AddressTown: 'Town',
        applicant1AddressCounty: 'County',
        applicant1AddressPostcode: 'Postcode',
        applicant1AddressOverseas: YesOrNo.NO,
      });
    });

    test('converts to UK format for applicant2', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant2Address: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          PostTown: 'Town',
          County: 'County',
          PostCode: 'Postcode',
        },
        applicant2AddressOverseas: YesOrNo.NO,
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant2Address1: 'Line 1',
        applicant2Address2: 'Line 2',
        applicant2AddressTown: 'Town',
        applicant2AddressCounty: 'County',
        applicant2AddressPostcode: 'Postcode',
        applicant2AddressOverseas: YesOrNo.NO,
      });
    });

    test('converts to UK format for applicant1NoResponsePartner', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1NoResponsePartnerAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          PostTown: 'Town',
          County: 'County',
          PostCode: 'Postcode',
        },
        applicant1NoResponsePartnerAddressOverseas: YesOrNo.NO,
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant1NoResponsePartnerAddress1: 'Line 1',
        applicant1NoResponsePartnerAddress2: 'Line 2',
        applicant1NoResponsePartnerAddressTown: 'Town',
        applicant1NoResponsePartnerAddressCounty: 'County',
        applicant1NoResponsePartnerAddressPostcode: 'Postcode',
        applicant1NoResponsePartnerAddressOverseas: YesOrNo.NO,
      });
    });

    test('converts to UK format for applicant1DispenseLivedTogether', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1DispenseLivedTogetherAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          PostTown: 'Town',
          County: 'County',
          PostCode: 'Postcode',
        },
        applicant1DispenseLivedTogetherAddressOverseas: YesOrNo.NO,
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant1DispenseLivedTogetherAddress1: 'Line 1',
        applicant1DispenseLivedTogetherAddress2: 'Line 2',
        applicant1DispenseLivedTogetherAddressTown: 'Town',
        applicant1DispenseLivedTogetherAddressCounty: 'County',
        applicant1DispenseLivedTogetherAddressPostcode: 'Postcode',
        applicant1DispenseLivedTogetherAddressOverseas: YesOrNo.NO,
      });
    });

    test('converts to an international format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1Address: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          AddressLine3: 'Line 3',
          PostTown: 'Town',
          County: 'State',
          PostCode: 'Zip code',
          Country: 'Country',
        },
        applicant1AddressOverseas: YesOrNo.YES,
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({});
    });
  });

  test('adds read only fields', () => {
    expect(
      fromApiFormat({
        applicationPayments: [
          {
            id: 'mock-payment',
          },
        ],
      } as unknown as CaseData)
    ).toStrictEqual({
      applicationPayments: [
        {
          id: 'mock-payment',
        },
      ],
    });
  });

  test('converts empty coClarificationResponses list value to empty string', () => {
    const nfdivFormat = fromApiFormat({
      ...results,
      coClarificationResponses: [],
    } as unknown as CaseData);

    expect(nfdivFormat).toMatchObject({
      coClarificationResponses: '',
    });
  });

  test.each([
    {
      applicant2SolicitorAddress:
        'testLine1\ntestLine2\ntestLine3\ntestLineTown\ntestLineCounty\ntestLinePostcode\ntestLineCountry',
      applicant2SolicitorAddressOverseas: YesOrNo.NO,
      expected: {
        applicant2SolicitorAddress:
          'testLine1\ntestLine2\ntestLine3\ntestLineTown\ntestLineCounty\ntestLinePostcode\ntestLineCountry',
        applicant2SolicitorAddress1: 'testLine1',
        applicant2SolicitorAddress2: 'testLine2',
        applicant2SolicitorAddress3: 'testLine3',
        applicant2SolicitorAddressTown: 'testLineTown',
        applicant2SolicitorAddressCounty: 'testLineCounty',
        applicant2SolicitorAddressPostcode: 'testLinePostcode',
        applicant2SolicitorAddressCountry: 'testLineCountry',
        applicant2SolicitorAddressOverseas: YesOrNo.NO,
      },
    },
    {
      applicant2SolicitorAddress: '\n\n\n\n\ntestLinePostcode\n',
      applicant2SolicitorAddressOverseas: YesOrNo.NO,
      expected: {
        applicant2SolicitorAddress: '\n\n\n\n\ntestLinePostcode\n',
        applicant2SolicitorAddress1: '',
        applicant2SolicitorAddress2: '',
        applicant2SolicitorAddress3: '',
        applicant2SolicitorAddressTown: '',
        applicant2SolicitorAddressCounty: '',
        applicant2SolicitorAddressPostcode: 'testLinePostcode',
        applicant2SolicitorAddressCountry: '',
        applicant2SolicitorAddressOverseas: YesOrNo.NO,
      },
    },
  ])('sets correct solicitors address fields by splitting the answer', ({ expected, ...formData }) => {
    expect(fromApiFormat(formData as unknown as CaseData)).toMatchObject(expected);
  });
  describe('fromApiFormat - applicant2InRefuge transformation', () => {
    test('defaults applicant2InRefuge to NO if undefined', () => {
      const nfdivFormat = fromApiFormat({
        applicant2InRefuge: undefined, // Simulate missing value
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant2InRefuge: YesOrNo.NO,
      });
    });

    test('retains applicant2InRefuge value if set to YES', () => {
      const nfdivFormat = fromApiFormat({
        applicant2InRefuge: YesOrNo.YES, // Explicit value set
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant2InRefuge: YesOrNo.YES,
      });
    });

    test('retains applicant2InRefuge value if set to NO', () => {
      const nfdivFormat = fromApiFormat({
        applicant2InRefuge: YesOrNo.NO, // Explicit value set
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant2InRefuge: YesOrNo.NO,
      });
    });

    test.each([
      { applicant2InRefuge: undefined, expected: YesOrNo.NO },
      { applicant2InRefuge: YesOrNo.YES, expected: YesOrNo.YES },
      { applicant2InRefuge: YesOrNo.NO, expected: YesOrNo.NO },
    ])('correctly handles applicant2InRefuge with value %p', ({ applicant2InRefuge, expected }) => {
      const nfdivFormat = fromApiFormat({ applicant2InRefuge } as unknown as CaseData);
      expect(nfdivFormat).toMatchObject({ applicant2InRefuge: expected });
    });

    test('handles null applicant2InRefuge gracefully', () => {
      const nfdivFormat = fromApiFormat({
        applicant2InRefuge: null, // Explicit null value
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant2InRefuge: YesOrNo.NO, // Defaults to NO
      });
    });
  });
});
