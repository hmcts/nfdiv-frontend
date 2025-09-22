import { Case, Checkbox, LanguagePreference } from './case';
import {
  AlternativeServiceDifferentWays,
  AlternativeServiceMethod,
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
  NoResponseCheckContactDetails,
  NoResponseNoNewAddressDetails,
  NoResponsePartnerNewEmailOrAddress,
  NoResponseProcessServerOrBailiff,
  YesOrNo,
} from './definition';
import { OrNull, toApiFormat } from './to-api-format';

const dateNow = new Date(Date.now());

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
    applicant1InRefuge: YesOrNo.YES,
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
    applicant1InterimAppsEvidenceUploadedFiles: [],
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
    app1RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
    app1RfiDraftResponseDetails: 'test',
    app1RfiDraftResponseUploadedFiles: [],
    app2RfiDraftResponseCannotUploadDocs: Checkbox.Unchecked,
    app2RfiDraftResponseDetails: 'test',
    app2RfiDraftResponseUploadedFiles: [],
    applicant2UnableToUploadEvidence: Checkbox.Checked,
    applicant1InterimAppsStatementOfTruth: Checkbox.Checked,
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
      applicant1InRefuge: YesOrNo.YES,
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
      applicant2LegalProceedingsConcluded: null,
      howToRespondApplication: HowToRespondApplication.DISPUTE_DIVORCE,
      coApplicant1StatementOfTruth: YesOrNo.YES,
      coApplicant2StatementOfTruth: YesOrNo.YES,
      coClarificationResponses: [{ id: '1', value: 'test' }],
      coCannotUploadClarificationDocuments: YesOrNo.YES,
      app1RfiDraftResponseCannotUploadDocs: YesOrNo.NO,
      app1RfiDraftResponseDetails: 'test',
      app2RfiDraftResponseCannotUploadDocs: YesOrNo.NO,
      app2RfiDraftResponseDetails: 'test',
      applicant2UnableToUploadEvidence: YesOrNo.YES,
      applicant1InterimAppsStatementOfTruth: YesOrNo.YES,
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
      applicant1InterimAppsHwfRefNumber: '123-ABC',
      relationshipDate: { year: '123' },
      applicant1InRefuge: undefined,
      applicant1AddressOverseas: undefined,
      applicant2AddressOverseas: undefined,
      applicant2SolicitorAddressOverseas: undefined,
      applicant1NoResponsePartnerAddressOverseas: undefined,
      applicant1BailiffPartnersDateOfBirth: { year: '123' },
      applicant1DispenseLivedTogetherAddressOverseas: undefined,
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant1HWFReferenceNumber: '',
      applicant2HWFReferenceNumber: '',
      applicant1InterimAppsHwfRefNumber: '',
      marriageDate: undefined,
      applicant1InRefuge: YesOrNo.NO,
      applicant1AddressOverseas: YesOrNo.NO,
      applicant2AddressOverseas: YesOrNo.NO,
      applicant2SolicitorAddressOverseas: YesOrNo.NO,
      applicant1NoResponsePartnerAddressOverseas: YesOrNo.NO,
      applicant1BailiffPartnersDateOfBirth: undefined,
      applicant1DispenseLivedTogetherAddressOverseas: YesOrNo.NO,
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
    {
      applicant1DispenseLivedTogetherDate: { year: '2020', month: '01', day: '01' },
      applicant1DispenseLivedTogetherAddress:
        'testLine1\ntestLine2\ntestLine3\ntestLineTown\ntestLineCounty\ntestLinePostcode\ntestLineCountry',
      applicant1DispenseLivedTogetherAddressOverseas: YesOrNo.YES,
      applicant1DispenseLiveTogether: YesOrNo.NO,
      expected: {
        applicant1DispenseLivedTogetherDate: null,
        applicant1DispenseLivedTogetherAddress: null,
        applicant1DispenseLivedTogetherAddressOverseas: null,
        applicant1DispenseLiveTogether: YesOrNo.NO,
      },
    },
    {
      applicant1DispensePartnerPastAddress1: 'Past address 1',
      applicant1DispensePartnerPastAddressEnquiries1: 'Past address Enquiries 1',
      applicant1DispensePartnerPastAddress2: 'Past address 2',
      applicant1DispensePartnerPastAddressEnquiries2: 'Past address Enquiries 2',
      applicant1DispenseAwarePartnerLived: YesOrNo.NO,
      expected: {
        applicant1DispensePartnerPastAddress1: null,
        applicant1DispensePartnerPastAddressEnquiries1: null,
        applicant1DispensePartnerPastAddress2: null,
        applicant1DispensePartnerPastAddressEnquiries2: null,
        applicant1DispenseAwarePartnerLived: YesOrNo.NO,
      },
    },
    {
      applicant1DispensePartnerEmailAddresses: 'email addresses',
      applicant1DispenseHavePartnerEmailAddresses: YesOrNo.NO,
      expected: {
        applicant1DispensePartnerEmailAddresses: null,
        applicant1DispenseHavePartnerEmailAddresses: YesOrNo.NO,
      },
    },
    {
      applicant1DispensePartnerPhoneNumbers: 'phone numbers',
      applicant1DispenseHavePartnerPhoneNumbers: YesOrNo.NO,
      expected: {
        applicant1DispensePartnerPhoneNumbers: null,
        applicant1DispenseHavePartnerPhoneNumbers: YesOrNo.NO,
      },
    },
    {
      applicant1DispenseTracingAgentResults: 'tracing agent results',
      applicant1DispenseTriedTracingAgent: YesOrNo.NO,
      expected: {
        applicant1DispenseTracingAgentResults: null,
        applicant1DispenseTriedTracingAgent: YesOrNo.NO,
      },
    },
    {
      applicant1DispenseTracingOnlineResults: 'tracing online results',
      applicant1DispenseTriedTracingOnline: YesOrNo.NO,
      expected: {
        applicant1DispenseTracingOnlineResults: null,
        applicant1DispenseTriedTracingOnline: YesOrNo.NO,
      },
    },
    {
      applicant1DispenseSearchingOnlineResults: 'searching online results',
      applicant1DispenseTriedSearchingOnline: YesOrNo.NO,
      expected: {
        applicant1DispenseSearchingOnlineResults: null,
        applicant1DispenseTriedSearchingOnline: YesOrNo.NO,
      },
    },
    {
      applicant1DispenseEmployerName: 'Employer name',
      applicant1DispenseEmployerAddress: 'Employer address',
      applicant1DispensePartnerOccupation: 'Occupation',
      applicant1DispenseContactingEmployerResults: 'Contacting employer results',
      applicant1DispenseTriedContactingEmployer: YesOrNo.NO,
      expected: {
        applicant1DispenseEmployerName: null,
        applicant1DispenseEmployerAddress: null,
        applicant1DispensePartnerOccupation: null,
        applicant1DispenseContactingEmployerResults: null,
        applicant1DispenseTriedContactingEmployer: YesOrNo.NO,
      },
    },
    {
      applicant1DispensePartnerContactWithChildren: YesOrNo.YES,
      applicant1DispenseHowPartnerContactChildren: 'How partner contact children',
      applicant1DispensePartnerLastContactChildren: 'Last contact children',
      applicant1DispenseChildMaintenanceOrder: YesOrNo.YES,
      applicant1DispenseChildMaintenanceResults: 'Child maintenance results',
      applicant1DispenseChildrenOfFamily: YesOrNo.NO,
      expected: {
        applicant1DispensePartnerContactWithChildren: null,
        applicant1DispenseHowPartnerContactChildren: null,
        applicant1DispensePartnerLastContactChildren: null,
        applicant1DispenseChildMaintenanceOrder: null,
        applicant1DispenseChildMaintenanceResults: null,
        applicant1DispenseChildrenOfFamily: YesOrNo.NO,
      },
    },
    {
      applicant1DispenseHowPartnerContactChildren: 'How partner contact children',
      applicant1DispensePartnerLastContactChildren: 'Last contact children',
      applicant1DispensePartnerContactWithChildren: YesOrNo.NO,
      expected: {
        applicant1DispenseHowPartnerContactChildren: null,
        applicant1DispensePartnerLastContactChildren: 'Last contact children',
        applicant1DispensePartnerContactWithChildren: YesOrNo.NO,
      },
    },
    {
      applicant1DispenseHowPartnerContactChildren: 'How partner contact children',
      applicant1DispensePartnerLastContactChildren: 'Last contact children',
      applicant1DispensePartnerContactWithChildren: YesOrNo.YES,
      expected: {
        applicant1DispenseHowPartnerContactChildren: 'How partner contact children',
        applicant1DispensePartnerLastContactChildren: null,
        applicant1DispensePartnerContactWithChildren: YesOrNo.YES,
      },
    },
    {
      applicant1DispenseChildMaintenanceResults: 'Child maintenance results',
      applicant1DispenseChildMaintenanceOrder: YesOrNo.NO,
      expected: {
        applicant1DispenseChildMaintenanceResults: null,
        applicant1DispenseChildMaintenanceOrder: YesOrNo.NO,
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

  describe('applicant2InRefuge transformation', () => {
    test('defaults applicant2InRefuge to NO if undefined', () => {
      const apiFormat = toApiFormat({
        applicant2InRefuge: undefined, // Simulate missing value
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant2InRefuge: YesOrNo.NO,
      });
    });

    test('retains applicant2InRefuge value if set', () => {
      const apiFormatYes = toApiFormat({
        applicant2InRefuge: YesOrNo.YES, // Simulate value is already set
      } as Partial<Case>);

      expect(apiFormatYes).toMatchObject({
        applicant2InRefuge: YesOrNo.YES,
      });

      const apiFormatNo = toApiFormat({
        applicant2InRefuge: YesOrNo.NO, // Simulate value is already set
      } as Partial<Case>);

      expect(apiFormatNo).toMatchObject({
        applicant2InRefuge: YesOrNo.NO,
      });
    });

    test.each([
      { applicant2InRefuge: undefined, expected: YesOrNo.NO },
      { applicant2InRefuge: YesOrNo.YES, expected: YesOrNo.YES },
      { applicant2InRefuge: YesOrNo.NO, expected: YesOrNo.NO },
    ])('correctly handles applicant2InRefuge with value %p', ({ applicant2InRefuge, expected }) => {
      const apiFormat = toApiFormat({ applicant2InRefuge } as Partial<Case>);
      expect(apiFormat).toMatchObject({ applicant2InRefuge: expected });
    });
  });

  describe('applicant1Deemed transformation', () => {
    test.each([
      {
        applicant1DeemedNoEvidenceStatement: 'Some statement',
        applicant1InterimAppsCanUploadEvidence: YesOrNo.YES,
        expected: {
          applicant1DeemedNoEvidenceStatement: null,
          applicant1InterimAppsCanUploadEvidence: YesOrNo.YES,
        },
      },
      {
        applicant1DeemedEvidenceDetails: 'Some details',
        applicant1InterimAppsCannotUploadDocs: Checkbox.Checked,
        applicant1InterimAppsCanUploadEvidence: YesOrNo.NO,
        expected: {
          applicant1DeemedEvidenceDetails: null,
          applicant1InterimAppsCannotUploadDocs: null,
          applicant1InterimAppsCanUploadEvidence: YesOrNo.NO,
        },
      },
    ])('transform deemed answers if condition met', ({ expected, ...formData }) => {
      expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
    });
  });

  describe('applicant1SearchGovRecordsKnowPartnerDateOfBirth transformation', () => {
    test('sets date of birth to null if the date of birth is not known', () => {
      const apiFormat = toApiFormat({
        applicant1SearchGovRecordsKnowPartnerDateOfBirth: YesOrNo.NO,
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1SearchGovRecordsKnowPartnerDateOfBirth: YesOrNo.NO,
        applicant1SearchGovRecordsPartnerDateOfBirth: null,
      });
    });

    test('sets approx age to null if the date of birth is known', () => {
      const apiFormat = toApiFormat({
        applicant1SearchGovRecordsKnowPartnerDateOfBirth: YesOrNo.YES,
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1SearchGovRecordsKnowPartnerDateOfBirth: YesOrNo.YES,
        applicant1SearchGovRecordsPartnerApproximateAge: null,
      });
    });
  });

  describe('applicant1SearchGovRecordsPartnerDateOfBirth transformation', () => {
    test('sets date of birth', () => {
      const apiFormat = toApiFormat({
        applicant1SearchGovRecordsPartnerDateOfBirth: { year: '1980', month: '01', day: '01' },
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1SearchGovRecordsPartnerDateOfBirth: '1980-01-01',
      });
    });
  });

  describe('applicant1BailiffKnowPartnersDateOfBirth transformation', () => {
    test('sets date of birth to null if the date of birth is not known', () => {
      const apiFormat = toApiFormat({
        applicant1BailiffKnowPartnersDateOfBirth: YesOrNo.NO,
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1BailiffKnowPartnersDateOfBirth: YesOrNo.NO,
        applicant1BailiffPartnersDateOfBirth: null,
      });
    });

    test('sets approx age to null if the date of birth is known', () => {
      const apiFormat = toApiFormat({
        applicant1BailiffKnowPartnersDateOfBirth: YesOrNo.YES,
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1BailiffKnowPartnersDateOfBirth: YesOrNo.YES,
        applicant1BailiffPartnersApproximateAge: null,
      });
    });
  });

  describe('applicant1SearchGovRecordsPartnerNationalInsurance transformation', () => {
    test('Capitalizes the national insurance number', () => {
      const apiFormat = toApiFormat({
        applicant1SearchGovRecordsKnowPartnerNationalInsurance: YesOrNo.YES,
        applicant1SearchGovRecordsPartnerNationalInsurance: 'xx 12 34 56 x',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1SearchGovRecordsKnowPartnerNationalInsurance: YesOrNo.YES,
        applicant1SearchGovRecordsPartnerNationalInsurance: 'XX 12 34 56 X',
      } as Partial<Case>);
    });

    test('convert value to upper case', () => {
      const apiFormat = toApiFormat({
        applicant1SearchGovRecordsKnowPartnerNationalInsurance: YesOrNo.YES,
        applicant1SearchGovRecordsPartnerNationalInsurance: 'xx 12 34 56 x',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1SearchGovRecordsKnowPartnerNationalInsurance: YesOrNo.YES,
        applicant1SearchGovRecordsPartnerNationalInsurance: 'XX 12 34 56 X',
      } as Partial<Case>);
    });
  });

  describe('applicant1AltServicePartnerEmail transformation', () => {
    test('sets applicant1AltServicePartnerEmail to the provided email when applicant1AltServiceMethod is EMAIL', () => {
      const apiFormat = toApiFormat({
        applicant1AltServiceMethod: AlternativeServiceMethod.EMAIL,
        applicant1AltServicePartnerEmail: 'test@test.com',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerEmail: 'test@test.com',
      });
    });

    test('sets applicant1AltServicePartnerEmail to the provided email when applicant1AltServiceMethod is EMAIL_AND_DIFFERENT', () => {
      const apiFormat = toApiFormat({
        applicant1AltServiceMethod: AlternativeServiceMethod.EMAIL_AND_DIFFERENT,
        applicant1AltServicePartnerEmailWhenDifferent: 'test@test.com',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerEmail: 'test@test.com',
      });
    });

    test('sets applicant1AltServicePartnerEmail to null when applicant1AltServiceMethod is not EMAIL or EMAIL_AND_DIFFERENT', () => {
      const apiFormat = toApiFormat({
        applicant1AltServiceMethod: AlternativeServiceMethod.DIFFERENT_WAY,
        applicant1AltServicePartnerEmail: 'test@test.com',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerEmail: null,
      });
    });
  });

  describe('applicant1AltServicePartnerPhone transformation', () => {
    test('sets applicant1AltServicePartnerPhone to the provided phone number when applicant1AltServiceDifferentWays includes TEXT_MESSAGE', () => {
      const apiFormat = toApiFormat({
        applicant1AltServicePartnerPhone: '1234567890',
        applicant1AltServiceDifferentWays: [AlternativeServiceDifferentWays.TEXT_MESSAGE],
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerPhone: '1234567890',
      });
    });

    test('sets applicant1AltServicePartnerPhone to null when applicant1AltServiceDifferentWays does not include TEXT_MESSAGE', () => {
      const apiFormat = toApiFormat({
        applicant1AltServicePartnerPhone: '1234567890',
        applicant1AltServiceDifferentWays: [],
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerPhone: null,
      });
    });
  });

  describe('applicant1AltServicePartnerWANum transformation', () => {
    test('sets applicant1AltServicePartnerWANum to the provided phone number when applicant1AltServiceDifferentWays includes WHATSAPP', () => {
      const apiFormat = toApiFormat({
        applicant1AltServicePartnerWANum: '1234567890',
        applicant1AltServiceDifferentWays: [AlternativeServiceDifferentWays.WHATSAPP],
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerWANum: '1234567890',
      });
    });

    test('sets applicant1AltServicePartnerPhone to null when applicant1AltServiceDifferentWays does not include WHATSAPP', () => {
      const apiFormat = toApiFormat({
        applicant1AltServicePartnerWANum: '1234567890',
        applicant1AltServiceDifferentWays: [],
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerWANum: null,
      });
    });
  });

  describe('applicant1AltServicePartnerSocialDetails transformation', () => {
    test('sets applicant1AltServicePartnerSocialDetails to the provided phone number when applicant1AltServiceDifferentWays includes SOCIAL_MEDIA', () => {
      const apiFormat = toApiFormat({
        applicant1AltServicePartnerSocialDetails: 'socialmediahandle',
        applicant1AltServiceDifferentWays: [AlternativeServiceDifferentWays.SOCIAL_MEDIA],
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerSocialDetails: 'socialmediahandle',
      });
    });

    test('sets applicant1AltServiceSocialDetails to null when applicant1AltServiceDifferentWays does not include SOCIAL_MEDIA', () => {
      const apiFormat = toApiFormat({
        applicant1AltServicePartnerSocialDetails: 'socialmediahandle',
        applicant1AltServiceDifferentWays: [],
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerSocialDetails: null,
      });
    });
  });

  describe('applicant1AltServicePartnerOtherDetails transformation', () => {
    test('sets applicant1AltServicePartnerOtherDetails to the provided phone number when applicant1AltServiceDifferentWays includes OTHER', () => {
      const apiFormat = toApiFormat({
        applicant1AltServicePartnerOtherDetails: 'other details',
        applicant1AltServiceDifferentWays: [AlternativeServiceDifferentWays.OTHER],
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerOtherDetails: 'other details',
      });
    });

    test('sets applicant1AltServiceOtherDetails to null when applicant1AltServiceDifferentWays does not include OTHER', () => {
      const apiFormat = toApiFormat({
        applicant1AltServicePartnerOtherDetails: 'other details',
        applicant1AltServiceDifferentWays: [],
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerOtherDetails: null,
      });
    });
  });

  describe('applicant1AltServiceDifferentWays transformation', () => {
    test('sets other fields to null when not selected in applicant1AltServiceDifferentWays', () => {
      const apiFormat = toApiFormat({
        applicant1AltServiceMethod: AlternativeServiceMethod.DIFFERENT_WAY,
        applicant1AltServiceDifferentWays: [
          AlternativeServiceDifferentWays.TEXT_MESSAGE,
          AlternativeServiceDifferentWays.SOCIAL_MEDIA,
        ],
        applicant1AltServicePartnerPhone: '1234567890',
        applicant1AltServicePartnerOtherDetails: 'some details',
        applicant1AltServicePartnerWANum: '1234567890',
        applicant1AltServicePartnerSocialDetails: 'some social details',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1AltServicePartnerWANum: null,
        applicant1AltServicePartnerOtherDetails: null,
      });
    });
  });

  describe('applicant1DispenseLastLivedTogetherDate transformation', () => {
    test('sets applicant1DispenseLivedTogetherDate when last lived together is yes', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseLastLivedTogetherDate: { year: '2018', month: '01', day: '01' },
        applicant1DispenseLiveTogether: YesOrNo.YES,
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseLivedTogetherDate: '2018-01-01',
      });
    });

    test('sets applicant1DispenseLivedTogetherDate to null when last lived together is no', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseLastLivedTogetherDate: { year: '2018', month: '01', day: '01' },
        applicant1DispenseLiveTogether: YesOrNo.NO,
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseLivedTogetherDate: null,
      });
    });
  });

  describe('applicant1DispensePartnerLastSeenOrHeardOfDate transformation', () => {
    test('sets applicant1DispensePartnerLastSeenOver2YearsAgo to yes when last seen date is over 2 years ago', () => {
      const apiFormat = toApiFormat({
        applicant1DispensePartnerLastSeenOrHeardOfDate: { year: '2020', month: '01', day: '01' },
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispensePartnerLastSeenOver2YearsAgo: YesOrNo.YES,
      });
    });

    test('sets applicant1DispensePartnerLastSeenOver2YearsAgo to no when last seen date is less than years ago', () => {
      const apiFormat = toApiFormat({
        applicant1DispensePartnerLastSeenOrHeardOfDate: {
          year: dateNow.getFullYear().toString(),
          month: dateNow.getMonth().toString(),
          day: dateNow.getDate().toString(),
        },
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispensePartnerLastSeenOver2YearsAgo: YesOrNo.NO,
      });
    });
  });

  describe('applicant1DispenseHavePartnerEmailAddresses transformation', () => {
    test('sets applicant1DispensePartnerEmailAddresses when applicant1DispenseHavePartnerEmailAddresses is yes', () => {
      const apiFormat = toApiFormat({
        applicant1DispensePartnerEmailAddresses: 'test@test.com',
        applicant1DispenseHavePartnerEmailAddresses: YesOrNo.YES,
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispensePartnerEmailAddresses: 'test@test.com',
      });
    });
  });

  describe('applicant1DispenseHavePartnerPhoneNumbers transformation', () => {
    test('sets applicant1DispensePartnerPhoneNumbers when applicant1DispenseHavePartnerPhoneNumbers is yes', () => {
      const apiFormat = toApiFormat({
        applicant1DispensePartnerPhoneNumbers: '01234567890',
        applicant1DispenseHavePartnerPhoneNumbers: YesOrNo.YES,
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispensePartnerPhoneNumbers: '01234567890',
      });
    });
  });

  describe('applicant1DispenseWhyNoFinalOrderSearch transformation', () => {
    test('sets applicant1DispenseWhyNoFinalOrderSearch when applicant1DispenseHaveSearchedFinalOrder is yes', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseHaveSearchedFinalOrder: YesOrNo.NO,
        applicant1DispenseWhyNoFinalOrderSearch: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoFinalOrderSearch: 'Some reason',
      });
    });

    test('sets applicant1DispenseWhyNoFinalOrderSearch to null when applicant1DispenseHaveSearchedFinalOrder is No', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseHaveSearchedFinalOrder: YesOrNo.YES,
        applicant1DispenseWhyNoFinalOrderSearch: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoFinalOrderSearch: null,
      });
    });
  });

  describe('applicant1DispenseWhyNoTracingAgent transformation', () => {
    test('sets applicant1DispenseWhyNoTracingAgent when applicant1DispenseTriedTracingAgent is No', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseTriedTracingAgent: YesOrNo.NO,
        applicant1DispenseWhyNoTracingAgent: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoTracingAgent: 'Some reason',
      });
    });

    test('sets applicant1DispenseWhyNoTracingAgent to null when applicant1DispenseTriedTracingAgent is Yes', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseTriedTracingAgent: YesOrNo.YES,
        applicant1DispenseWhyNoTracingAgent: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoTracingAgent: null,
      });
    });
  });

  describe('applicant1DispenseWhyNoTracingOnline transformation', () => {
    test('sets applicant1DispenseWhyNoTracingOnline when applicant1DispenseTriedTracingOnline is No', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseTriedTracingOnline: YesOrNo.NO,
        applicant1DispenseWhyNoTracingOnline: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoTracingOnline: 'Some reason',
      });
    });

    test('sets applicant1DispenseWhyNoTracingOnline to null when applicant1DispenseTriedTracingOnline is Yes', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseTriedTracingOnline: YesOrNo.YES,
        applicant1DispenseWhyNoTracingOnline: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoTracingOnline: null,
      });
    });
  });

  describe('applicant1DispenseWhyNoSearchingOnline transformation', () => {
    test('sets applicant1DispenseWhyNoSearchingOnline when applicant1DispenseTriedSearchingOnline is No', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseTriedSearchingOnline: YesOrNo.NO,
        applicant1DispenseWhyNoSearchingOnline: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoSearchingOnline: 'Some reason',
      });
    });

    test('sets applicant1DispenseWhyNoSearchingOnline to null when applicant1DispenseTriedSearchingOnline is Yes', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseTriedSearchingOnline: YesOrNo.YES,
        applicant1DispenseWhyNoSearchingOnline: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoSearchingOnline: null,
      });
    });
  });

  describe('applicant1DispenseWhyNoContactingEmployer transformation', () => {
    test('sets applicant1DispenseWhyNoContactingEmployer when applicant1DispenseTriedContactingEmployer is No', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseTriedContactingEmployer: YesOrNo.NO,
        applicant1DispenseWhyNoContactingEmployer: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoContactingEmployer: 'Some reason',
      });
    });

    test('sets applicant1DispenseWhyNoContactingEmployer to null when applicant1DispenseTriedContactingEmployer is Yes', () => {
      const apiFormat = toApiFormat({
        applicant1DispenseTriedContactingEmployer: YesOrNo.YES,
        applicant1DispenseWhyNoContactingEmployer: 'Some reason',
      } as Partial<Case>);

      expect(apiFormat).toMatchObject({
        applicant1DispenseWhyNoContactingEmployer: null,
      });
    });
  });

  describe('applicant1Dispense transformation', () => {
    test.each([
      {
        applicant1InterimAppsCannotUploadDocs: YesOrNo.NO,
        applicant1NoResponsePartnerEmailAddress: 'test',
        applicant1NoResponsePartnerHasReceivedPapers: YesOrNo.NO,
        applicant1NoResponseCheckContactDetails: NoResponseCheckContactDetails.UP_TO_DATE,
        applicant1NoResponseProvidePartnerNewEmailOrAlternativeService: AlternativeServiceMethod.DIFFERENT_WAY,
        applicant1NoResponsePartnerNewEmailOrAddress: NoResponsePartnerNewEmailOrAddress.CONTACT_DETAILS_UPDATED,
        applicant1NoResponseNoNewAddressDetails: NoResponseNoNewAddressDetails.NO_CONTACT_DETAILS,
        applicant1NoResponseProcessServerOrBailiff: NoResponseProcessServerOrBailiff.PROCESS_SERVER,
        applicant1InterimAppsIUnderstand: Checkbox.Checked,
        applicant1NoResponsePartnerAddressOverseas: YesOrNo.YES,
        applicant1NoResponseRespondentAddressInEnglandWales: Checkbox.Checked,
        expected: {
          applicant1InterimAppsCannotUploadDocs: YesOrNo.NO,
          applicant1NoResponsePartnerEmailAddress: 'test',
          applicant1NoResponsePartnerHasReceivedPapers: YesOrNo.NO,
          applicant1NoResponseCheckContactDetails: NoResponseCheckContactDetails.UP_TO_DATE,
          applicant1NoResponseProvidePartnerNewEmailOrAlternativeService: AlternativeServiceMethod.DIFFERENT_WAY,
          applicant1NoResponsePartnerNewEmailOrAddress: NoResponsePartnerNewEmailOrAddress.CONTACT_DETAILS_UPDATED,
          applicant1NoResponseNoNewAddressDetails: NoResponseNoNewAddressDetails.NO_CONTACT_DETAILS,
          applicant1NoResponseProcessServerOrBailiff: NoResponseProcessServerOrBailiff.PROCESS_SERVER,
          applicant1InterimAppsIUnderstand: YesOrNo.YES,
          applicant1NoResponsePartnerAddressOverseas: YesOrNo.YES,
          applicant1NoResponseRespondentAddressInEnglandWales: YesOrNo.YES,
        },
      },
      {
        applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
        applicant1InterimAppsHwfRefNumber: 'HWF-A1B-23D',
        applicant1InterimAppsUseHelpWithFees: YesOrNo.NO,
        expected: {
          applicant1InterimAppsUseHelpWithFees: YesOrNo.NO,
          applicant1InterimAppsHaveHwfReference: null,
          applicant1InterimAppsHwfRefNumber: null,
        },
      },
      {
        applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
        applicant1InterimAppsHwfRefNumber: 'HWF-A1B-23D',
        applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
        expected: {
          applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
          applicant1InterimAppsHwfRefNumber: 'HWF-A1B-23D',
          applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
        },
      },
      {
        applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
        applicant1InterimAppsHwfRefNumber: 'HWF-A1B-23D',
        applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
        expected: {
          applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
          applicant1InterimAppsHwfRefNumber: 'HWF-A1B-23D',
          applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
        },
      },
      {
        applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
        applicant1InterimAppsHwfRefNumber: 'test',
        expected: {
          applicant1InterimAppsHwfRefNumber: '',
          applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
        },
      },
      {
        applicant1NoResponsePartnerAddressOverseas: YesOrNo.YES,
        applicant1DispenseLivedTogetherAddressOverseas: YesOrNo.YES,
        expected: {
          applicant1NoResponsePartnerAddressOverseas: YesOrNo.YES,
          applicant1DispenseLivedTogetherAddressOverseas: YesOrNo.YES,
        },
      },
      {
        applicant1NoResponsePartnerAddressOverseas: null,
        applicant1DispenseLivedTogetherAddressOverseas: null,
        expected: {
          applicant1NoResponsePartnerAddressOverseas: YesOrNo.NO,
          applicant1DispenseLivedTogetherAddressOverseas: YesOrNo.NO,
        },
      },
    ])('transform dispense answers if condition met', ({ expected, ...formData }) => {
      expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
    });
  });
});
