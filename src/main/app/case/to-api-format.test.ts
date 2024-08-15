import { Case, Checkbox, LanguagePreference } from './case';
import {
  Applicant2Represented,
  ApplicationType,
  ChangedNameHow,
  ContactDetailsType,
  DivorceOrDissolution,
  DocumentType,
  EndCivilPartnership,
  FinancialOrderFor,
  Gender,
  HowToRespondApplication,
  MarriageFormation,
  YesOrNo,
} from './definition';
import { OrNull, toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results: OrNull<Partial<Case>> = {
    gender: Gender.MALE,
    applicationType: ApplicationType.SOLE_APPLICATION,
    sameSex: Checkbox.Checked,
    relationshipDate: { year: '1900', month: '1', day: '4' },
    applicant1HelpPayingNeeded: YesOrNo.YES,
    applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant1HelpWithFeesRefNo: 'HWF-123-ABC',
    applicant2HelpPayingNeeded: YesOrNo.YES,
    applicant2SolicitorName: 'Solicitor Name',
    applicant2SolicitorEmail: 'solicitor@email.com',
    applicant2SolicitorFirmName: 'Solicitor Firm Name',
    applicant2SolicitorAddress1: 'Address 1',
    applicant2SolicitorAddress2: 'Address 2',
    applicant2SolicitorAddress3: 'Address 3',
    applicant2SolicitorAddressTown: 'Address Town',
    applicant2SolicitorAddressCounty: 'Address County',
    applicant2SolicitorAddressPostcode: 'Address Postcode',
    applicant2SolicitorAddressCountry: 'Address Country',
    applicant2SolicitorAddressOverseas: YesOrNo.NO,
    applicant1IsApplicant2Represented: Applicant2Represented.NO,
    applicant2AlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant2HelpWithFeesRefNo: 'HWF-123-CBA',
    applicant2FoAlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant2FoHelpWithFeesRefNo: 'HWF-123-CBA',
    applicant2FoHelpPayingNeeded: YesOrNo.YES,
    applicant1AgreeToReceiveEmails: Checkbox.Checked,
    applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
    applicant1AddressPrivate: YesOrNo.YES,
    applicant1KnowsApplicant2Address: YesOrNo.NO,
    applicant2AddressPrivate: YesOrNo.YES,
    iWantToHavePapersServedAnotherWay: null,
    applicant1EnglishOrWelsh: LanguagePreference.English,
    applicant2EnglishOrWelsh: LanguagePreference.English,
    applicant1NameChangedHow: [ChangedNameHow.OTHER],
    applicant2NameChangedHow: [ChangedNameHow.OTHER],
    applicant1NameChangedHowOtherDetails: 'Test',
    applicant2NameChangedHowOtherDetails: 'Test',
    applicant1CannotUploadDocuments: [],
    applicant2CannotUploadDocuments: [],
    applicant1IConfirmPrayer: Checkbox.Checked,
    applicant2IConfirmPrayer: Checkbox.Checked,
    applicant1StatementOfTruth: Checkbox.Checked,
    applicant2StatementOfTruth: Checkbox.Checked,
    aosStatementOfTruth: Checkbox.Checked,
    applicant1FinalOrderStatementOfTruth: Checkbox.Checked,
    applicant2FinalOrderStatementOfTruth: Checkbox.Checked,
    doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
    doesApplicant2WantToApplyForFinalOrder: Checkbox.Checked,
    applicant2AgreeToReceiveEmails: Checkbox.Checked,
    applicant1UploadedFiles: [],
    applicant2UploadedFiles: [],
    confirmReadPetition: Checkbox.Checked,
    applicant1LegalProceedingsDetails: 'Test',
    applicant2LegalProceedingsDetails: 'Test',
    applicant1LegalProceedings: YesOrNo.NO,
    applicant2LegalProceedings: YesOrNo.NO,
    disputeApplication: YesOrNo.YES,
    coApplicant1StatementOfTruth: Checkbox.Checked,
    coApplicant2StatementOfTruth: Checkbox.Checked,
    coCannotUploadClarificationDocuments: Checkbox.Checked,
    coClarificationResponses: 'test',
    applicant1AddressOverseas: YesOrNo.NO,
    applicant2AddressOverseas: YesOrNo.NO,
  };

  const resultsWithSecondaryValues: OrNull<Partial<Case>> = {
    applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Unchecked,
    applicant1IConfirmPrayer: Checkbox.Unchecked,
    applicant2IConfirmPrayer: Checkbox.Unchecked,
    applicant1AddressPrivate: YesOrNo.NO,
    applicant2AddressPrivate: YesOrNo.NO,
    disputeApplication: YesOrNo.NO,
    applicant1EnglishOrWelsh: LanguagePreference.Welsh,
    applicant2AlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant2HelpWithFeesRefNo: '12345',
    applicant2HelpPayingNeeded: YesOrNo.NO,
    applicant2FoAlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant2FoHelpWithFeesRefNo: '12345',
    applicant2FoHelpPayingNeeded: YesOrNo.NO,
    applicant2SolicitorName: 'Solicitor Name',
    applicant2SolicitorEmail: 'solicitor@email.com',
    applicant2SolicitorFirmName: 'Solicitor Firm Name',
    applicant2SolicitorAddress1: 'Address 1',
    applicant2SolicitorAddress2: 'Address 2',
    applicant2SolicitorAddress3: 'Address 3',
    applicant2SolicitorAddressTown: 'Address Town',
    applicant2SolicitorAddressCounty: 'Address County',
    applicant2SolicitorAddressPostcode: 'Address Postcode',
    applicant2SolicitorAddressCountry: 'Address Country',
    applicant2SolicitorAddressOverseas: YesOrNo.NO,
    applicant1IsApplicant2Represented: Applicant2Represented.YES,
    applicant1NameChangedHow: [],
    applicant2NameChangedHow: [],
    applicant1NameChangedHowOtherDetails: 'Test',
    applicant2NameChangedHowOtherDetails: 'Test',
    applicant1CannotUploadDocuments: DocumentType.NAME_CHANGE_EVIDENCE,
    applicant2CannotUploadDocuments: DocumentType.NAME_CHANGE_EVIDENCE,
    applicant1ApplyForFinancialOrder: YesOrNo.YES,
    applicant1WhoIsFinancialOrderFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
    applicant2ApplyForFinancialOrder: YesOrNo.NO,
    applicant2WhoIsFinancialOrderFor: [],
    applicant1AddressOverseas: YesOrNo.YES,
    applicant2AddressOverseas: YesOrNo.YES,
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      marriageFormationType: MarriageFormation.SAME_SEX_COUPLE,
      applicant2Gender: Gender.MALE,
      applicant1Gender: Gender.MALE,
      applicationType: ApplicationType.SOLE_APPLICATION,
      marriageDate: '1900-01-04',
      applicant1HWFNeedHelp: YesOrNo.YES,
      applicant1HWFAppliedForFees: YesOrNo.YES,
      applicant1HWFReferenceNumber: 'HWF-123-ABC',
      applicant2HWFNeedHelp: YesOrNo.YES,
      applicant2HWFAppliedForFees: YesOrNo.YES,
      applicant2HWFReferenceNumber: 'HWF-123-CBA',
      applicant2FoHWFNeedHelp: YesOrNo.YES,
      applicant2FoHWFAppliedForFees: YesOrNo.YES,
      applicant2FoHWFReferenceNumber: 'HWF-123-CBA',
      applicant2SolicitorAddress: null,
      applicant2SolicitorAddressOverseas: null,
      applicant2SolicitorEmail: null,
      applicant2SolicitorFirmName: null,
      applicant2SolicitorName: null,
      applicant1IsApplicant2Represented: Applicant2Represented.NO,
      applicant1AgreedToReceiveEmails: YesOrNo.YES,
      applicant1ContactDetailsType: ContactDetailsType.PRIVATE,
      applicant1KnowsApplicant2Address: YesOrNo.NO,
      applicant1KnowsApplicant2EmailAddress: YesOrNo.NO,
      applicant1WantsToHavePapersServedAnotherWay: null,
      applicant1LanguagePreferenceWelsh: 'No',
      applicant2LanguagePreferenceWelsh: 'No',
      applicant2ContactDetailsType: ContactDetailsType.PRIVATE,
      applicant1CannotUploadSupportingDocument: [],
      applicant1CannotUpload: 'No',
      applicant2CannotUploadSupportingDocument: [],
      applicant2CannotUpload: 'No',
      applicant1PrayerDissolveDivorce: [],
      applicant1PrayerEndCivilPartnership: [EndCivilPartnership.END_CIVIL_PARTNERSHIP],
      applicant1PrayerFinancialOrdersChild: [],
      applicant1PrayerFinancialOrdersThemselves: [],
      applicant2PrayerDissolveDivorce: [],
      applicant2PrayerEndCivilPartnership: [EndCivilPartnership.END_CIVIL_PARTNERSHIP],
      applicant2PrayerFinancialOrdersChild: [],
      applicant2PrayerFinancialOrdersThemselves: [],
      applicant1StatementOfTruth: 'Yes',
      applicant2StatementOfTruth: 'Yes',
      statementOfTruth: 'Yes',
      applicant1NameChangedHow: [ChangedNameHow.OTHER],
      applicant2NameChangedHow: [ChangedNameHow.OTHER],
      applicant1NameChangedHowOtherDetails: 'Test',
      applicant2NameChangedHowOtherDetails: 'Test',
      applicant2Address: {
        AddressLine1: '',
        AddressLine2: '',
        AddressLine3: '',
        PostTown: '',
        County: '',
        PostCode: '',
        Country: '',
      },
      applicant2AddressOverseas: YesOrNo.NO,
      applicant1AddressOverseas: YesOrNo.NO,
      applicant1FinalOrderStatementOfTruth: YesOrNo.YES,
      applicant2FinalOrderStatementOfTruth: YesOrNo.YES,
      doesApplicant1WantToApplyForFinalOrder: YesOrNo.YES,
      doesApplicant2WantToApplyForFinalOrder: YesOrNo.YES,
      applicant2AgreedToReceiveEmails: YesOrNo.YES,
      confirmReadPetition: YesOrNo.YES,
      applicant1LegalProceedings: YesOrNo.NO,
      applicant1LegalProceedingsDetails: null,
      applicant2LegalProceedings: YesOrNo.NO,
      applicant2LegalProceedingsDetails: null,
      howToRespondApplication: HowToRespondApplication.DISPUTE_DIVORCE,
      coApplicant1StatementOfTruth: YesOrNo.YES,
      coApplicant2StatementOfTruth: YesOrNo.YES,
      coClarificationResponses: [{ id: '1', value: 'test' }],
      coCannotUploadClarificationDocuments: YesOrNo.YES,
    });
  });

  test('Should convert results from nfdiv to api fe format with secondary values', async () => {
    const apiFormat = toApiFormat(resultsWithSecondaryValues as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      applicant1ContactDetailsType: ContactDetailsType.PUBLIC,
      applicant1KnowsApplicant2EmailAddress: YesOrNo.YES,
      applicant2ContactDetailsType: ContactDetailsType.PUBLIC,
      applicant1PrayerDissolveDivorce: [],
      applicant1PrayerEndCivilPartnership: [],
      applicant1PrayerFinancialOrdersChild: [],
      applicant1PrayerFinancialOrdersThemselves: [],
      applicant2PrayerDissolveDivorce: [],
      applicant2PrayerEndCivilPartnership: [],
      applicant2PrayerFinancialOrdersChild: [],
      applicant2PrayerFinancialOrdersThemselves: [],
      howToRespondApplication: HowToRespondApplication.WITHOUT_DISPUTE_DIVORCE,
      applicant1LanguagePreferenceWelsh: 'Yes',
      applicant2HWFNeedHelp: YesOrNo.NO,
      applicant2HWFAppliedForFees: null,
      applicant2HWFReferenceNumber: null,
      applicant2FoHWFNeedHelp: YesOrNo.NO,
      applicant2FoHWFAppliedForFees: null,
      applicant2FoHWFReferenceNumber: null,
      applicant1IsApplicant2Represented: Applicant2Represented.YES,
      applicant2SolicitorName: 'Solicitor Name',
      applicant2SolicitorEmail: 'solicitor@email.com',
      applicant2SolicitorFirmName: 'Solicitor Firm Name',
      applicant2SolicitorAddress:
        'Address 1\nAddress 2\nAddress 3\nAddress Town\nAddress County\nAddress Postcode\nAddress Country',
      applicant2SolicitorAddressOverseas: YesOrNo.NO,
      applicant1NameChangedHowOtherDetails: '',
      applicant2NameChangedHowOtherDetails: '',
      applicant1NameChangedHow: [],
      applicant2NameChangedHow: [],
      applicant1CannotUploadSupportingDocument: [DocumentType.NAME_CHANGE_EVIDENCE],
      applicant1CannotUpload: YesOrNo.YES,
      applicant2CannotUploadSupportingDocument: [DocumentType.NAME_CHANGE_EVIDENCE],
      applicant2CannotUpload: YesOrNo.YES,
      applicant1FinancialOrder: YesOrNo.YES,
      applicant1FinancialOrdersFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
      applicant2FinancialOrder: YesOrNo.NO,
      applicant2FinancialOrdersFor: [],
      applicant1AddressOverseas: YesOrNo.YES,
      applicant2AddressOverseas: YesOrNo.YES,
    });
  });

  test('handles invalid data correctly', async () => {
    const apiFormat = toApiFormat({
      applicant1HelpWithFeesRefNo: '123-ABC',
      applicant2HelpWithFeesRefNo: '123-123',
      relationshipDate: { year: '123' },
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant1HWFReferenceNumber: '',
      applicant2HWFReferenceNumber: '',
      marriageDate: '',
    });
  });

  test('converts applicant1IntendsToSwitchToSole with checkboxConverterSwitchToSoleIntention', async () => {
    const apiFormat = toApiFormat({
      applicant1IntendsToSwitchToSole: Checkbox.Checked,
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant1IntendsToSwitchToSole: [YesOrNo.YES],
    });
  });

  test('converts applicant2IntendsToSwitchToSole with checkboxConverterSwitchToSoleIntention', async () => {
    const apiFormat = toApiFormat({
      applicant2IntendsToSwitchToSole: Checkbox.Checked,
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant2IntendsToSwitchToSole: [YesOrNo.YES],
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
        applicant1Gender: expected.applicant1,
        applicant2Gender: expected.applicant2,
      });
    }
  );

  test('converts your address to match API format', () => {
    const apiFormat = toApiFormat({
      ...results,
      applicant1Address1: 'Line 1',
      applicant1Address2: 'Line 2',
      applicant1Address3: '',
      applicant1AddressTown: 'Town',
      applicant1AddressCounty: 'County',
      applicant1AddressPostcode: 'Postcode',
      applicant1AddressCountry: 'UK',
    } as unknown as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant1Address: {
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

  test.each([
    {
      applicant1LastNameChangedWhenMarried: YesOrNo.YES,
      applicant1NameDifferentToMarriageCertificate: YesOrNo.NO,
      expected: {
        applicant1LastNameChangedWhenMarried: YesOrNo.YES,
      },
    },
    {
      applicant1LastNameChangedWhenMarried: YesOrNo.NO,
      applicant1NameDifferentToMarriageCertificate: YesOrNo.NO,
      expected: {
        applicant1LastNameChangedWhenMarried: YesOrNo.NO,
      },
    },
    {
      applicant2LastNameChangedWhenMarried: YesOrNo.YES,
      applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      expected: {
        applicant2LastNameChangedWhenMarried: YesOrNo.YES,
      },
    },
    {
      applicant2LastNameChangedWhenMarried: YesOrNo.NO,
      applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      expected: {
        applicant2LastNameChangedWhenMarried: YesOrNo.NO,
      },
    },
    {
      applicant1HelpPayingNeeded: YesOrNo.YES,
      expected: {
        applicant1HWFNeedHelp: YesOrNo.YES,
      },
    },
    {
      applicant1HelpPayingNeeded: YesOrNo.NO,
      expected: {
        applicant1HWFNeedHelp: YesOrNo.NO,
        applicant1HWFAppliedForFees: null,
        applicant1HWFReferenceNumber: null,
      },
    },
    {
      applicant1KnowsApplicant2Address: YesOrNo.YES,
      expected: {
        applicant1KnowsApplicant2Address: YesOrNo.YES,
        applicant1WantsToHavePapersServedAnotherWay: null,
      },
    },
    {
      applicationType: ApplicationType.JOINT_APPLICATION,
      expected: {
        applicationType: ApplicationType.JOINT_APPLICATION,
        applicant1IsApplicant2Represented: null,
        applicant2SolicitorRepresented: null,
        applicant2SolicitorName: null,
        applicant2SolicitorEmail: null,
        applicant2SolicitorFirmName: null,
        applicant2SolicitorAddress: null,
        applicant2SolicitorAddressOverseas: null,
      },
    },
    {
      applicant1KnowsApplicant2Address: YesOrNo.NO,
      expected: {
        applicant1KnowsApplicant2Address: YesOrNo.NO,
        applicant2Address: {
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
          PostTown: '',
          County: '',
          PostCode: '',
          Country: '',
        },
      },
    },
    {
      inTheUk: YesOrNo.NO,
      expected: {
        marriageMarriedInUk: YesOrNo.NO,
      },
    },
    {
      certifiedTranslation: YesOrNo.YES,
      certificateInEnglish: YesOrNo.YES,
      expected: {
        marriageCertificateInEnglish: YesOrNo.YES,
        marriageCertifiedTranslation: null,
      },
    },
    {
      certificateInEnglish: YesOrNo.NO,
      certifiedTranslation: YesOrNo.YES,
      ceremonyCountry: 'Northern Ireland',
      inTheUk: YesOrNo.YES,
      expected: {
        marriageMarriedInUk: YesOrNo.YES,
        marriageCertificateInEnglish: null,
        marriageCertifiedTranslation: null,
        marriageCountryOfMarriage: null,
        marriagePlaceOfMarriage: null,
      },
    },
  ])('set unreachable answers to null if condition met', ({ expected, ...formData }) => {
    expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
  });

  test.each([
    {
      applicant1ApplyForFinancialOrder: YesOrNo.YES,
      applicant1WhoIsFinancialOrderFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
      applicant2ApplyForFinancialOrder: YesOrNo.YES,
      applicant2WhoIsFinancialOrderFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
      expected: {
        applicant1FinancialOrder: YesOrNo.YES,
        applicant1FinancialOrdersFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
        applicant2FinancialOrder: YesOrNo.YES,
        applicant2FinancialOrdersFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
      },
    },
    {
      applicant1ApplyForFinancialOrder: YesOrNo.NO,
      applicant1WhoIsFinancialOrderFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
      applicant2ApplyForFinancialOrder: YesOrNo.NO,
      applicant2WhoIsFinancialOrderFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
      expected: {
        applicant1FinancialOrder: YesOrNo.NO,
        applicant1FinancialOrdersFor: [],
        applicant2FinancialOrder: YesOrNo.NO,
        applicant2FinancialOrdersFor: [],
      },
    },
  ])('sets correct subfields of financial order', ({ expected, ...formData }) => {
    expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
  });

  test('sets coClarificationResponses to empty array if no response was entered', async () => {
    const apiFormat = toApiFormat({
      coClarificationResponses: '',
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      coClarificationResponses: [],
    });
  });

  test.each([
    {
      applicant2SolicitorAddress1: 'testLine1',
      applicant2SolicitorAddress2: 'testLine2',
      applicant2SolicitorAddress3: 'testLine3',
      applicant2SolicitorAddressTown: 'testLineTown',
      applicant2SolicitorAddressCounty: 'testLineCounty',
      applicant2SolicitorAddressPostcode: 'testLinePostcode',
      applicant2SolicitorAddressCountry: 'testLineCountry',
      applicant2SolicitorAddressOverseas: YesOrNo.NO,
      expected: {
        applicant2SolicitorAddress:
          'testLine1\ntestLine2\ntestLine3\ntestLineTown\ntestLineCounty\ntestLinePostcode\ntestLineCountry',
      },
    },
    {
      applicant2SolicitorAddress1: '',
      applicant2SolicitorAddress2: '',
      applicant2SolicitorAddress3: '',
      applicant2SolicitorAddressTown: '',
      applicant2SolicitorAddressCounty: '',
      applicant2SolicitorAddressPostcode: 'testLinePostcode',
      applicant2SolicitorAddressCountry: '',
      applicant2SolicitorAddressOverseas: YesOrNo.NO,
      expected: {
        applicant2SolicitorAddress: '\n\n\n\n\ntestLinePostcode\n',
      },
    },
  ])('sets correct solicitors address depending on the fields entered', ({ expected, ...formData }) => {
    expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
  });

  test.each([
    {
      applicant1LastNameChangedWhenMarried: YesOrNo.YES,
      applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
      applicant2LastNameChangedWhenMarried: YesOrNo.YES,
      applicant2LastNameChangedWhenMarriedMethod: [ChangedNameHow.DEED_POLL],
      expected: {
        applicant1LastNameChangedWhenMarried: YesOrNo.YES,
        applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
        applicant2LastNameChangedWhenMarried: YesOrNo.YES,
        applicant2LastNameChangedWhenMarriedMethod: [ChangedNameHow.DEED_POLL],
      },
    },
    {
      applicant1LastNameChangedWhenMarried: YesOrNo.NO,
      applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
      applicant2LastNameChangedWhenMarried: YesOrNo.NO,
      applicant2LastNameChangedWhenMarriedMethod: [ChangedNameHow.DEED_POLL],
      expected: {
        applicant1LastNameChangedWhenMarried: YesOrNo.NO,
        applicant1LastNameChangedWhenMarriedMethod: [],
        applicant2LastNameChangedWhenMarried: YesOrNo.NO,
        applicant2LastNameChangedWhenMarriedMethod: [],
      },
    },
    {
      applicant1LastNameChangedWhenMarried: YesOrNo.YES,
      applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.OTHER],
      applicant1LastNameChangedWhenMarriedOtherDetails: 'App1 when married details',
      applicant2LastNameChangedWhenMarried: YesOrNo.YES,
      applicant2LastNameChangedWhenMarriedMethod: [ChangedNameHow.OTHER],
      applicant2LastNameChangedWhenMarriedOtherDetails: 'App2 when married details',
      expected: {
        applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.OTHER],
        applicant1LastNameChangedWhenMarriedOtherDetails: 'App1 when married details',
        applicant2LastNameChangedWhenMarriedMethod: [ChangedNameHow.OTHER],
        applicant2LastNameChangedWhenMarriedOtherDetails: 'App2 when married details',
      },
    },
    {
      applicant1LastNameChangedWhenMarried: YesOrNo.YES,
      applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
      applicant1LastNameChangedWhenMarriedOtherDetails: 'App1 when married details',
      applicant2LastNameChangedWhenMarried: YesOrNo.NO,
      applicant2LastNameChangedWhenMarriedMethod: [],
      applicant2LastNameChangedWhenMarriedOtherDetails: 'App2 when married details',
      expected: {
        applicant1LastNameChangedWhenMarriedMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
        applicant1LastNameChangedWhenMarriedOtherDetails: '',
        applicant2LastNameChangedWhenMarriedMethod: [],
        applicant2LastNameChangedWhenMarriedOtherDetails: '',
      },
    },
    {
      applicant1NameDifferentToMarriageCertificate: YesOrNo.YES,
      applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
      applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      applicant2NameDifferentToMarriageCertificateMethod: [ChangedNameHow.DEED_POLL],
      expected: {
        applicant1NameDifferentToMarriageCertificate: YesOrNo.YES,
        applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
        applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
        applicant2NameDifferentToMarriageCertificateMethod: [ChangedNameHow.DEED_POLL],
      },
    },
    {
      applicant1NameDifferentToMarriageCertificate: YesOrNo.NO,
      applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
      applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      applicant2NameDifferentToMarriageCertificateMethod: [ChangedNameHow.DEED_POLL],
      expected: {
        applicant1NameDifferentToMarriageCertificate: YesOrNo.NO,
        applicant1NameDifferentToMarriageCertificateMethod: [],
        applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
        applicant2NameDifferentToMarriageCertificateMethod: [],
      },
    },
    {
      applicant1NameDifferentToMarriageCertificate: YesOrNo.YES,
      applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.OTHER],
      applicant1NameDifferentToMarriageCertificateOtherDetails: 'App1 when married details',
      applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      applicant2NameDifferentToMarriageCertificateMethod: [ChangedNameHow.OTHER],
      applicant2NameDifferentToMarriageCertificateOtherDetails: 'App2 when married details',
      expected: {
        applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.OTHER],
        applicant1NameDifferentToMarriageCertificateOtherDetails: 'App1 when married details',
        applicant2NameDifferentToMarriageCertificateMethod: [ChangedNameHow.OTHER],
        applicant2NameDifferentToMarriageCertificateOtherDetails: 'App2 when married details',
      },
    },
    {
      applicant1NameDifferentToMarriageCertificate: YesOrNo.YES,
      applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
      applicant1NameDifferentToMarriageCertificateOtherDetails: 'App1 when married details',
      applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      applicant2NameDifferentToMarriageCertificateMethod: [],
      applicant2NameDifferentToMarriageCertificateOtherDetails: 'App2 when married details',
      expected: {
        applicant1NameDifferentToMarriageCertificateMethod: [ChangedNameHow.MARRIAGE_CERTIFICATE],
        applicant1NameDifferentToMarriageCertificateOtherDetails: '',
        applicant2NameDifferentToMarriageCertificateMethod: [],
        applicant2NameDifferentToMarriageCertificateOtherDetails: '',
      },
    },
  ])('Name changed works', ({ expected, ...formData }) => {
    expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
  });
});
