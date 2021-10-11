import { StepWithContent } from '../../../steps';
import { Case } from '../case';
import { CaseData, YesOrNo } from '../definition';
import { fromApiFormat } from '../from-api-format';

import { getUnreachableAnswersAsNull, omitUnreachableAnswers } from './possibleAnswers';

describe('omitUnreachableAnswers()', () => {
  test('omits unreachable answers', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      valid2: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => 'next-url',
        form: { fields: { valid1: {} } },
      },
      {
        url: 'next-url',
        getNextStep: () => '',
        form: { fields: { valid2: {} } },
      },
    ] as unknown as StepWithContent[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me', valid2: 'pick-me' });
  });

  test('omits unreachable answers with checkboxes', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: { fields: { someCheckboxes: { type: 'checkboxes', values: [{ name: 'valid1' }] } } },
      },
      {
        url: 'not-this-one',
        getNextStep: () => '',
        form: { fields: { someCheckboxes: { type: 'checkboxes', values: [{ name: 'invalid1' }] } } },
      },
    ] as unknown as StepWithContent[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me' });
  });

  test('omits unreachable answers with subfields', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      valid2: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: {
          fields: {
            someCheckboxes: {
              type: 'radios',
              values: [{ value: 'Yes', subFields: { valid1: { type: 'text' }, valid2: { type: 'text' } } }],
            },
          },
        },
      },
    ] as unknown as StepWithContent[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me', valid2: 'pick-me' });
  });

  test('omits unreachable answers with date', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: { fields: { valid1: { type: 'date', values: [{ name: 'day' }] } } },
      },
    ] as unknown as StepWithContent[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me' });
  });

  test('returns unreachable answers as null', async () => {
    const userCase = {
      certificateInEnglish: YesOrNo.NO,
      certifiedTranslation: YesOrNo.YES,
      ceremonyCountry: 'Northern Ireland',
    };

    const actual = getUnreachableAnswersAsNull(userCase);

    expect(actual).toEqual({
      certificateInEnglish: null,
      certifiedTranslation: null,
      ceremonyCountry: null,
    });
  });

  test('returns unreachable answers as null on joint application', async () => {
    const userCase = fromApiFormat({
      applicant1AgreedToReceiveEmails: 'Yes',
      applicant1LegalProceedingsRelated: [],
      applicant1KeepContactDetailsConfidential: 'No',
      applicationType: 'jointApplication',
      labelContentTheApplicant2UC: null,
      generalReferralType: null,
      generalOrderDate: null,
      applicant2AgreeToReceiveEmails: null,
      jurisdictionApp1HabituallyResLastSixMonths: null,
      alternativeServiceMedium: null,
      applicant1HWFAppliedForFees: null,
      jurisdictionApplicant2Residence: 'Yes',
      marriageMarriedInUk: 'Yes',
      rejectReason: {
        rejectDetails: null,
        rejectReasonType: null,
      },
      generalEmailParties: null,
      dateFinalOrderSubmitted: null,
      marriageDate: '1999-12-31',
      applicant2InviteEmailAddress: 'husband@example.com',
      applicant2ConfirmApplicant1Information: YesOrNo.YES,
      applicant1MiddleName: '',
      applicant2StatementOfTruth: 'Yes',
      jurisdictionApp1HabituallyResLastTwelveMonths: null,
      solUrgentCase: null,
      generalOrderDivorceParties: null,
      applicant1WantsToHavePapersServedAnotherWay: null,
      applicant1LegalProceedings: 'No',
      applicant2AgreedToReceiveEmails: 'Yes',
      applicant1Email: 'nfdiv.frontend.test8.20210913-135527675@hmcts.net',
      marriageCertifiedTranslation: null,
      applicant1Gender: 'female',
      labelContentUnionType: 'dissolution',
      applicant2NameDifferentToMarriageCertificate: 'No',
      solSignStatementOfTruth: null,
      pbaNumbers: null,
      marriageIsSameSexCouple: 'No',
      labelContentTheApplicant2: null,
      applicant1KnowsApplicant2EmailAddress: 'Yes',
      generalOrderDetails: null,
      generalReferralJudgeDetails: null,
      applicant2ScreenHasMarriageBroken: 'Yes',
      generalOrderJudgeName: null,
      labelContentApplicant2UC: null,
      dateConditionalOrderSubmitted: null,
      applicant1CorrespondenceAddress: {
        County: null,
        Country: null,
        PostCode: null,
        PostTown: null,
        AddressLine1: null,
        AddressLine2: null,
        AddressLine3: null,
      },
      applicant2HWFReferenceNumber: null,
      solStatementOfReconciliationName: null,
      app2ContactMethodIsDigital: null,
      generalEmailOtherRecipientEmail: null,
      marriageApplicant2Name: 'Husbands name',
      divorceOrDissolution: 'divorce',
      applicant1FinancialOrderFor: [],
      marriageCertificateInEnglish: null,
      documentUploadComplete: null,
      generalEmailOtherRecipientName: null,
      applicant2Gender: 'male',
      generalOrderLegalAdvisorName: null,
      generalReferralLegalAdvisorDetails: null,
      applicant1NameDifferentToMarriageCertificate: 'No',
      applicant1LegalProceedingsDetails: null,
      marriagePlaceOfMarriage: null,
      applicant1FinancialOrder: 'No',
      applicant2LastName: 'Test your last name',
      applicant1PhoneNumber: '',
      applicant2HWFNeedHelp: null,
      applicant1ScreenHasMarriageBroken: 'Yes',
      jurisdictionConnections: ['A'],
      applicant1NameChangedHowOtherDetails: null,
      solStatementOfReconciliationCertify: null,
      applicant2LegalProceedingsRelated: [],
      createdDate: null,
      applicant2FinancialOrder: 'No',
      applicant2LastNameChangedWhenMarried: 'No',
      applicant1HWFNeedHelp: 'No',
      labelContentApplicant2: null,
      jurisdictionApplicant1Domicile: null,
      miniApplicationLink: null,
      solApplicationFeeInPounds: null,
      applicant2UserId: '66dbba23-51e9-4406-ad3e-497976fdba0b',
      applicant2PhoneNumber: '',
      applicant2LegalProceedingsDetails: null,
      applicant2NameChangedHowOtherDetails: null,
      applicant2CorrespondenceAddress: {
        County: null,
        Country: null,
        PostCode: null,
        PostTown: null,
        AddressLine1: null,
        AddressLine2: null,
        AddressLine3: null,
      },
      marriageMarriageCertificateIsIncorrectDetails: null,
      generalApplicationReferralDate: null,
      jurisdictionResidualEligible: null,
      dueDate: '2021-09-27',
      applicant2PcqId: null,
      applicant1LastNameChangedWhenMarried: 'No',
      solStatementOfReconciliationFirm: null,
      solPaymentHowToPay: null,
      dateAosSubmitted: null,
      applicant2ExplainsApplicant1IncorrectInformation: null,
      accessCode: null,
      applicant1HomeAddress: {
        County: 'CITY OF WESTMINSTER',
        Country: 'UK',
        PostCode: 'SW1A 1AA',
        PostTown: 'LONDON',
        AddressLine1: 'BUCKINGHAM PALACE',
        AddressLine2: '',
        AddressLine3: '',
      },
      generalOrderJudgeType: null,
      applicant1PrayerHasBeenGiven: null,
      generalOrderRecitals: null,
      applicant2FirstName: 'Test your name',
      marriageCertifyMarriageCertificateIsCorrect: null,
      applicant2LanguagePreferenceWelsh: 'No',
      labelContentUnionTypeUC: null,
      jurisdictionApplicant2Domicile: null,
      applicant1FirstName: 'Test your name',
      previousState: null,
      applicant1PcqId: null,
      feeAccountReference: null,
      applicationFeeOrderSummary: {
        Fees: [],
        PaymentTotal: null,
        PaymentReference: null,
      },
      applicant2ConfirmReceipt: null,
      applicant1LastName: 'Test your last name',
      applicant1LanguagePreferenceWelsh: 'No',
      dateSubmitted: null,
      generalReferralFeeRequired: null,
      applicant2HWFAppliedForFees: null,
      generalOrderDraft: null,
      divorceWho: null,
      applicant2MiddleName: '',
      marriageApplicant1Name: 'First name Last name',
      solUrgentCaseSupportingInformation: null,
      applicant1CannotUploadSupportingDocument: ['marriageCertificate'],
      applicant1KnowsApplicant2Address: null,
      applicant1ConfirmReceipt: null,
      solStatementOfReconciliationDiscussed: null,
      applicant2NameChangedHow: null,
      issueDate: null,
      applicant2SolicitorRepresented: null,
      applicant1StatementOfTruth: null,
      generalReferralReason: null,
      solServiceMethod: null,
      applicant2HomeAddress: {
        County: 'CITY OF WESTMINSTER',
        Country: 'UK',
        PostCode: 'SW1H 9AJ',
        PostTown: 'LONDON',
        AddressLine1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
        AddressLine2: '',
        AddressLine3: '',
      },
      jurisdictionApplicant1Residence: 'Yes',
      applicant1NameChangedHow: null,
      screenHasMarriageCert: 'Yes',
      applicationPayments: [],
      generalEmailDetails: null,
      applicant2FinancialOrderFor: null,
      applicant1HWFReferenceNumber: null,
      generalApplicationFrom: null,
      applicant2LegalProceedings: null,
      applicant2PrayerHasBeenGiven: 'Yes',
      applicant2KeepContactDetailsConfidential: 'No',
      applicant2CannotUploadSupportingDocument: null,
      jurisdictionBothLastHabituallyResident: null,
      applicant2Email: null,
      applicant1SolicitorRepresented: null,
      marriageCountryOfMarriage: null,
      marriageIssueApplicationWithoutMarriageCertificate: null,
      statementOfReconciliationComments: null,
    } as unknown as CaseData);

    const actual = getUnreachableAnswersAsNull(userCase);

    expect(actual).toEqual({
      applicant2UploadedFiles: null,
    });
  });

  test('returns respondent answers as null', async () => {
    const userCase = {
      applicant2LegalProceedings: YesOrNo.NO,
      applicant2LegalProceedingsDetails: 'test',
    };

    const actual = getUnreachableAnswersAsNull(userCase);

    expect(actual).toEqual({
      applicant2LegalProceedingsDetails: null,
    });
  });

  test('does not set IGNORE_UNREACHABLE_FIELDS to null', async () => {
    const userCase = {
      applicant1FirstNames: 'test',
      applicant1LastNames: 'test',
      certificateInEnglish: YesOrNo.NO,
      certifiedTranslation: YesOrNo.YES,
    };

    const actual = getUnreachableAnswersAsNull(userCase);

    expect(actual).toEqual({
      certificateInEnglish: null,
      certifiedTranslation: null,
    });
  });
});
