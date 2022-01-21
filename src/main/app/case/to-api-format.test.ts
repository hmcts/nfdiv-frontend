import { Case, Checkbox, LanguagePreference } from './case';
import {
  ChangedNameHow,
  ContactDetailsType,
  DivorceOrDissolution,
  Gender,
  HowToRespondApplication,
  MarriageFormation,
  ThePrayer,
  YesOrNo,
} from './definition';
import { OrNull, toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results: OrNull<Partial<Case>> = {
    gender: Gender.MALE,
    sameSex: Checkbox.Checked,
    relationshipDate: { year: '1900', month: '1', day: '4' },
    applicant1HelpPayingNeeded: YesOrNo.YES,
    applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant1HelpWithFeesRefNo: 'HWF-123-ABC',
    applicant2HelpPayingNeeded: YesOrNo.YES,
    applicant2AlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant2HelpWithFeesRefNo: 'HWF-123-CBA',
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
    applicant1ChangedNameHowAnotherWay: 'Test',
    applicant2ChangedNameHowAnotherWay: 'Test',
    applicant1CannotUploadDocuments: [],
    applicant2CannotUploadDocuments: [],
    applicant1IConfirmPrayer: Checkbox.Checked,
    applicant2IConfirmPrayer: Checkbox.Checked,
    applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    applicant2IBelieveApplicationIsTrue: Checkbox.Checked,
    jurisdictionResidualEligible: Checkbox.Checked,
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
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      marriageFormationType: MarriageFormation.SAME_SEX_COUPLE,
      applicant2Gender: Gender.MALE,
      applicant1Gender: Gender.MALE,
      marriageDate: '1900-01-04',
      applicant1HWFNeedHelp: YesOrNo.YES,
      applicant1HWFAppliedForFees: YesOrNo.YES,
      applicant1HWFReferenceNumber: 'HWF-123-ABC',
      applicant2HWFNeedHelp: YesOrNo.YES,
      applicant2HWFAppliedForFees: YesOrNo.YES,
      applicant2HWFReferenceNumber: 'HWF-123-CBA',
      applicant1AgreedToReceiveEmails: YesOrNo.YES,
      applicant1ContactDetailsType: ContactDetailsType.PRIVATE,
      applicant1KnowsApplicant2Address: YesOrNo.NO,
      applicant1KnowsApplicant2EmailAddress: YesOrNo.NO,
      applicant1WantsToHavePapersServedAnotherWay: null,
      applicant1LanguagePreferenceWelsh: 'No',
      applicant2LanguagePreferenceWelsh: 'No',
      applicant2ContactDetailsType: ContactDetailsType.PRIVATE,
      applicant1CannotUploadSupportingDocument: [],
      applicant2CannotUploadSupportingDocument: [],
      applicant1PrayerHasBeenGivenCheckbox: [ThePrayer.I_CONFIRM],
      applicant2PrayerHasBeenGivenCheckbox: [ThePrayer.I_CONFIRM],
      applicant1StatementOfTruth: 'Yes',
      applicant2StatementOfTruth: 'Yes',
      applicant1NameChangedHow: [ChangedNameHow.OTHER],
      applicant2NameChangedHow: [ChangedNameHow.OTHER],
      applicant1NameChangedHowOtherDetails: 'Test',
      applicant2NameChangedHowOtherDetails: 'Test',
      applicant2HomeAddress: {
        AddressLine1: null,
        AddressLine2: null,
        AddressLine3: null,
        PostTown: null,
        County: null,
        PostCode: null,
        Country: null,
      },
      jurisdictionResidualEligible: YesOrNo.YES,
      applicant2AgreedToReceiveEmails: YesOrNo.YES,
      confirmReadPetition: YesOrNo.YES,
      applicant1LegalProceedings: YesOrNo.NO,
      applicant1LegalProceedingsDetails: null,
      applicant2LegalProceedings: YesOrNo.NO,
      applicant2LegalProceedingsDetails: null,
      howToRespondApplication: HowToRespondApplication.DISPUTE_DIVORCE,
      coApplicant1StatementOfTruth: YesOrNo.YES,
      coApplicant2StatementOfTruth: YesOrNo.YES,
    });
  });

  test('Should convert results from nfdiv to api fe format with secondary values', async () => {
    const apiFormat = toApiFormat(resultsWithSecondaryValues as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      applicant1ContactDetailsType: ContactDetailsType.PUBLIC,
      applicant1KnowsApplicant2EmailAddress: YesOrNo.YES,
      applicant2ContactDetailsType: ContactDetailsType.PUBLIC,
      applicant1PrayerHasBeenGivenCheckbox: [],
      applicant2PrayerHasBeenGivenCheckbox: [],
      howToRespondApplication: HowToRespondApplication.WITHOUT_DISPUTE_DIVORCE,
      applicant1LanguagePreferenceWelsh: 'Yes',
      applicant2HWFNeedHelp: YesOrNo.NO,
      applicant2HWFAppliedForFees: null,
      applicant2HWFReferenceNumber: null,
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

  test.each([
    {
      applicant1LastNameChangedWhenRelationshipFormed: YesOrNo.YES,
      applicant1NameChangedSinceRelationshipFormed: YesOrNo.NO,
      expected: {
        applicant1LastNameChangedWhenMarried: YesOrNo.YES,
      },
    },
    {
      applicant1LastNameChangedWhenRelationshipFormed: YesOrNo.NO,
      applicant1NameChangedSinceRelationshipFormed: YesOrNo.NO,
      expected: {
        applicant1LastNameChangedWhenMarried: YesOrNo.NO,
        applicant1NameChangedHow: null,
        applicant1NameChangedHowOtherDetails: null,
      },
    },
    {
      applicant2LastNameChangedWhenRelationshipFormed: YesOrNo.YES,
      applicant2NameChangedSinceRelationshipFormed: YesOrNo.NO,
      expected: {
        applicant2LastNameChangedWhenMarried: YesOrNo.YES,
      },
    },
    {
      applicant2LastNameChangedWhenRelationshipFormed: YesOrNo.NO,
      applicant2NameChangedSinceRelationshipFormed: YesOrNo.NO,
      expected: {
        applicant2LastNameChangedWhenMarried: YesOrNo.NO,
        applicant2NameChangedHow: null,
        applicant2NameChangedHowOtherDetails: null,
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
      applicant1KnowsApplicant2Address: YesOrNo.NO,
      expected: {
        applicant1KnowsApplicant2Address: YesOrNo.NO,
        applicant2HomeAddress: {
          AddressLine1: null,
          AddressLine2: null,
          AddressLine3: null,
          PostTown: null,
          County: null,
          PostCode: null,
          Country: null,
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
});
