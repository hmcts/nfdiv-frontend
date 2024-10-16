import { AnyObject } from '../controller/PostController';

import {
  AlternativeServiceOutcome,
  Applicant2Represented,
  ApplicationType,
  CaseData,
  ChangedNameHow,
  ClarificationReason,
  ClarificationResponse,
  ConditionalOrderCourt,
  DateAsString,
  DivorceDocument,
  DivorceOrDissolution,
  DocumentType,
  FinancialOrderFor,
  Gender,
  JurisdictionConnections,
  LegalAdvisorDecision,
  ListValue,
  OrderSummary,
  Payment,
  RequestForInformation,
  State,
  YesOrNo,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  applicationType: 'applicationType',
  divorceOrDissolution: 'divorceOrDissolution',
  gender: 'applicant2Gender',
  applicant1ScreenHasUnionBroken: 'applicant1ScreenHasMarriageBroken',
  applicant2ScreenHasUnionBroken: 'applicant2ScreenHasMarriageBroken',
  hasCertificate: 'screenHasMarriageCert',
  applicant1HelpPayingNeeded: 'applicant1HWFNeedHelp',
  applicant1AlreadyAppliedForHelpPaying: 'applicant1HWFAppliedForFees',
  applicant1HelpWithFeesRefNo: 'applicant1HWFReferenceNumber',
  applicant2HelpPayingNeeded: 'applicant2HWFNeedHelp',
  applicant2AlreadyAppliedForHelpPaying: 'applicant2HWFAppliedForFees',
  applicant2HelpWithFeesRefNo: 'applicant2HWFReferenceNumber',
  applicant2FoHelpPayingNeeded: 'applicant2FoHWFNeedHelp',
  applicant2FoAlreadyAppliedForHelpPaying: 'applicant2FoHWFAppliedForFees',
  applicant2FoHelpWithFeesRefNo: 'applicant2FoHWFReferenceNumber',
  inTheUk: 'marriageMarriedInUk',
  certificateInEnglish: 'marriageCertificateInEnglish',
  certifiedTranslation: 'marriageCertifiedTranslation',
  ceremonyCountry: 'marriageCountryOfMarriage',
  ceremonyPlace: 'marriagePlaceOfMarriage',
  applicant1LifeBasedInEnglandAndWales: 'jurisdictionApplicant1Residence',
  applicant2LifeBasedInEnglandAndWales: 'jurisdictionApplicant2Residence',
  applicant1DomicileInEnglandWales: 'jurisdictionApplicant1Domicile',
  applicant2DomicileInEnglandWales: 'jurisdictionApplicant2Domicile',
  bothLastHabituallyResident: 'jurisdictionBothLastHabituallyResident',
  applicant1LivingInEnglandWalesTwelveMonths: 'jurisdictionApp1HabituallyResLastTwelveMonths',
  applicant1LivingInEnglandWalesSixMonths: 'jurisdictionApp1HabituallyResLastSixMonths',
  connections: 'jurisdictionConnections',
  jurisdictionResidualEligible: 'jurisdictionResidualEligible',
  applicant1PhoneNumber: 'applicant1PhoneNumber',
  applicant1FirstNames: 'applicant1FirstName',
  applicant1MiddleNames: 'applicant1MiddleName',
  applicant1LastNames: 'applicant1LastName',
  applicant1ConfirmFullName: 'applicant1ConfirmFullName',
  applicant2FirstNames: 'applicant2FirstName',
  applicant2MiddleNames: 'applicant2MiddleName',
  applicant2LastNames: 'applicant2LastName',
  applicant2ConfirmFullName: 'applicant2ConfirmFullName',
  applicant1FullNameOnCertificate: 'marriageApplicant1Name',
  applicant2FullNameOnCertificate: 'marriageApplicant2Name',
  applicant1ConfirmReceipt: 'applicant1ConfirmReceipt',
  applicant2ConfirmReceipt: 'applicant2ConfirmReceipt',
  applicant1LastNameChangedWhenMarried: 'applicant1LastNameChangedWhenMarried',
  applicant1NameDifferentToMarriageCertificate: 'applicant1NameDifferentToMarriageCertificate',
  applicant1NameChangedHow: 'applicant1NameChangedHow',
  applicant1NameChangedHowOtherDetails: 'applicant1NameChangedHowOtherDetails',
  applicant1LastNameChangedWhenMarriedMethod: 'applicant1LastNameChangedWhenMarriedMethod',
  applicant1LastNameChangedWhenMarriedOtherDetails: 'applicant1LastNameChangedWhenMarriedOtherDetails',
  applicant1NameDifferentToMarriageCertificateMethod: 'applicant1NameDifferentToMarriageCertificateMethod',
  applicant1NameDifferentToMarriageCertificateOtherDetails: 'applicant1NameDifferentToMarriageCertificateOtherDetails',
  applicant2LastNameChangedWhenMarried: 'applicant2LastNameChangedWhenMarried',
  applicant2NameDifferentToMarriageCertificate: 'applicant2NameDifferentToMarriageCertificate',
  applicant2NameChangedHow: 'applicant2NameChangedHow',
  applicant2NameChangedHowOtherDetails: 'applicant2NameChangedHowOtherDetails',
  applicant2LastNameChangedWhenMarriedMethod: 'applicant2LastNameChangedWhenMarriedMethod',
  applicant2LastNameChangedWhenMarriedOtherDetails: 'applicant2LastNameChangedWhenMarriedOtherDetails',
  applicant2NameDifferentToMarriageCertificateMethod: 'applicant2NameDifferentToMarriageCertificateMethod',
  applicant2NameDifferentToMarriageCertificateOtherDetails: 'applicant2NameDifferentToMarriageCertificateOtherDetails',
  applicant1Email: 'applicant1Email',
  applicant2Email: 'applicant2Email',
  applicant2EmailAddress: 'applicant2InviteEmailAddress',
  applicant2PhoneNumber: 'applicant2PhoneNumber',
  applicant1KnowsApplicant2Address: 'applicant1KnowsApplicant2Address',
  applicant1LegalProceedings: 'applicant1LegalProceedings',
  applicant1LegalProceedingsDetails: 'applicant1LegalProceedingsDetails',
  applicant2LegalProceedings: 'applicant2LegalProceedings',
  applicant2LegalProceedingsDetails: 'applicant2LegalProceedingsDetails',
  applicant1ApplyForFinancialOrder: 'applicant1FinancialOrder',
  applicant1WhoIsFinancialOrderFor: 'applicant1FinancialOrdersFor',
  applicant2ApplyForFinancialOrder: 'applicant2FinancialOrder',
  applicant2WhoIsFinancialOrderFor: 'applicant2FinancialOrdersFor',
  applicant1DocumentsUploaded: 'applicant1DocumentsUploaded',
  applicant2DocumentsUploaded: 'applicant2DocumentsUploaded',
  documentsGenerated: 'documentsGenerated',
  documentsUploaded: 'documentsUploaded',
  respondentUserId: 'applicant2UserId',
  applicant2Confirmation: 'applicant2ConfirmApplicant1Information',
  applicant2Explanation: 'applicant2ExplainsApplicant1IncorrectInformation',
  applicant1PcqId: 'applicant1PcqId',
  issueDate: 'issueDate',
  applicant1SolicitorAddress: 'applicant1SolicitorAddress',
  applicant1SolicitorRepresented: 'applicant1SolicitorRepresented',
  applicant1SolicitorAddressOverseas: 'applicant1SolicitorAddressOverseas',
  accessCode: 'accessCode',
  applicationFeeOrderSummary: 'applicationFeeOrderSummary',
  applicationFeeServiceRequestReference: 'applicationFeeServiceRequestReference',
  applicant2FinalOrderFeeOrderSummary: 'applicant2FinalOrderFeeOrderSummary',
  applicant2FinalOrderFeeServiceRequestReference: 'applicant2FinalOrderFeeServiceRequestReference',
  applicationPayments: 'applicationPayments',
  finalOrderPayments: 'finalOrderPayments',
  confirmDisputeApplication: 'confirmDisputeApplication',
  jurisdictionAgree: 'jurisdictionAgree',
  intendToDelay: 'intendToDelay',
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: 'reasonCourtsOfEnglandAndWalesHaveNoJurisdiction',
  inWhichCountryIsYourLifeMainlyBased: 'inWhichCountryIsYourLifeMainlyBased',
  alternativeServiceOutcomes: 'alternativeServiceOutcomes',
  applicant1ApplyForConditionalOrderStarted: 'coApplicant1ApplyForConditionalOrderStarted',
  applicant2ApplyForConditionalOrderStarted: 'coApplicant2ApplyForConditionalOrderStarted',
  applicant1ApplyForConditionalOrder: 'coApplicant1ApplyForConditionalOrder',
  applicant2ApplyForConditionalOrder: 'coApplicant2ApplyForConditionalOrder',
  applicant1ConfirmInformationStillCorrect: 'coApplicant1ConfirmInformationStillCorrect',
  applicant1ReasonInformationNotCorrect: 'coApplicant1ReasonInformationNotCorrect',
  applicant2ConfirmInformationStillCorrect: 'coApplicant2ConfirmInformationStillCorrect',
  applicant2ReasonInformationNotCorrect: 'coApplicant2ReasonInformationNotCorrect',
  coCourt: 'coCourt',
  coCertificateOfEntitlementDocument: 'coCertificateOfEntitlementDocument',
  coConditionalOrderGrantedDocument: 'coConditionalOrderGrantedDocument',
  coDateAndTimeOfHearing: 'coDateAndTimeOfHearing',
  coDecisionDate: 'coDecisionDate',
  coGrantedDate: 'coGrantedDate',
  applicant1IsApplicant2Represented: 'applicant1IsApplicant2Represented',
  coRefusalClarificationReason: 'coRefusalClarificationReason',
  coRefusalClarificationAdditionalInfo: 'coRefusalClarificationAdditionalInfo',
  coClarificationUploadDocuments: 'coClarificationUploadDocuments',
  coLegalAdvisorDecisions: 'coLegalAdvisorDecisions',
  dateFinalOrderEligibleToRespondent: 'dateFinalOrderEligibleToRespondent',
  dateFinalOrderNoLongerEligible: 'dateFinalOrderNoLongerEligible',
  applicant2SolicitorName: 'applicant2SolicitorName',
  applicant2SolicitorEmail: 'applicant2SolicitorEmail',
  applicant2SolicitorFirmName: 'applicant2SolicitorFirmName',
  applicant1FinalOrderLateExplanation: 'applicant1FinalOrderLateExplanation',
  applicant2FinalOrderLateExplanation: 'applicant2FinalOrderLateExplanation',
  applicant2FinalOrderExplanation: 'applicant2FinalOrderExplanation',
  applicant1CannotUpload: 'applicant1CannotUpload',
  applicant2CannotUpload: 'applicant2CannotUpload',
  applicant2SolicitorRepresented: 'applicant2SolicitorRepresented',
  applicant1UsedWelshTranslationOnSubmission: 'applicant1UsedWelshTranslationOnSubmission',
  applicant2UsedWelshTranslationOnSubmission: 'applicant2UsedWelshTranslationOnSubmission',
  coRefusalRejectionAdditionalInfo: 'coRefusalRejectionAdditionalInfo',
  dueDate: 'dueDate',
  dateSubmitted: 'dateSubmitted',
  dateAosSubmitted: 'dateAosSubmitted',
  dateFinalOrderSubmitted: 'dateFinalOrderSubmitted',
  coApplicant1SubmittedDate: 'coApplicant1SubmittedDate',
  coApplicant2SubmittedDate: 'coApplicant2SubmittedDate',
  dateFinalOrderEligibleFrom: 'dateFinalOrderEligibleFrom',
  applicant1AppliedForFinalOrderFirst: 'applicant1AppliedForFinalOrderFirst',
  applicant2AppliedForFinalOrderFirst: 'applicant2AppliedForFinalOrderFirst',
  doesApplicant1IntendToSwitchToSole: 'doesApplicant1IntendToSwitchToSole',
  dateApplicant1DeclaredIntentionToSwitchToSoleFo: 'dateApplicant1DeclaredIntentionToSwitchToSoleFo',
  doesApplicant2IntendToSwitchToSole: 'doesApplicant2IntendToSwitchToSole',
  dateApplicant2DeclaredIntentionToSwitchToSoleFo: 'dateApplicant2DeclaredIntentionToSwitchToSoleFo',
  finalOrderSwitchedToSole: 'finalOrderSwitchedToSole',
  applicant1CanIntendToSwitchToSoleFo: 'applicant1CanIntendToSwitchToSoleFo',
  applicant2CanIntendToSwitchToSoleFo: 'applicant2CanIntendToSwitchToSoleFo',
  isFinalOrderOverdue: 'isFinalOrderOverdue',
  app1RfiDraftResponseDocs: 'app1RfiDraftResponseDocs',
  app2RfiDraftResponseDocs: 'app2RfiDraftResponseDocs',
  citizenPaymentCallbackUrl: 'citizenPaymentCallbackUrl',
};

export function formatCase<OutputFormat>(fields: FieldFormats, data: Partial<Case> | CaseData): OutputFormat {
  const result = {};

  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }

  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  applicationType?: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  issueDate?: DateAsString;
  applicant1SolicitorAddress?: string;
  applicant1SolicitorAddressOverseas?: YesOrNo;
  applicant2SolicitorAddress?: string;
  applicant2SolicitorAddressOverseas?: YesOrNo;
  gender?: Gender;
  sameSex?: Checkbox;
  applicant1ScreenHasUnionBroken?: YesOrNo;
  applicant2ScreenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  applicant1HelpPayingNeeded?: YesOrNo;
  applicant1AlreadyAppliedForHelpPaying?: YesOrNo;
  applicant1HelpWithFeesRefNo?: string;
  applicant2HelpPayingNeeded?: YesOrNo;
  applicant2AlreadyAppliedForHelpPaying?: YesOrNo;
  applicant2HelpWithFeesRefNo?: string;
  applicant2FoHelpPayingNeeded?: YesOrNo;
  applicant2FoAlreadyAppliedForHelpPaying?: YesOrNo;
  applicant2FoHelpWithFeesRefNo?: string;
  inTheUk?: YesOrNo;
  certificateInEnglish?: YesOrNo;
  certifiedTranslation?: YesOrNo;
  ceremonyCountry?: string;
  ceremonyPlace?: string;
  applicant1LifeBasedInEnglandAndWales?: YesOrNo;
  applicant2LifeBasedInEnglandAndWales?: YesOrNo;
  applicant1DomicileInEnglandWales?: YesOrNo;
  applicant2DomicileInEnglandWales?: YesOrNo;
  bothLastHabituallyResident?: YesOrNo;
  applicant1LivingInEnglandWalesTwelveMonths?: YesOrNo;
  applicant1LivingInEnglandWalesSixMonths?: YesOrNo;
  jurisdictionResidualEligible?: YesOrNo;
  applicant1EnglishOrWelsh?: LanguagePreference;
  applicant2EnglishOrWelsh?: LanguagePreference;
  applicant1FirstNames?: string;
  applicant1MiddleNames?: string;
  applicant1LastNames?: string;
  applicant1ConfirmFullName?: YesOrNo | null;
  applicant1Address1?: string;
  applicant1Address2?: string;
  applicant1Address3?: string;
  applicant1AddressTown?: string;
  applicant1AddressCounty?: string;
  applicant1AddressPostcode?: string;
  applicant1AddressCountry?: string;
  applicant1AddressOverseas?: YesOrNo;
  applicant1PhoneNumber?: string;
  applicant1AgreeToReceiveEmails?: Checkbox;
  applicant1ConfirmReceipt: YesOrNo;
  applicant2PhoneNumber?: string;
  applicant2AgreeToReceiveEmails?: Checkbox;
  applicant2ConfirmReceipt: YesOrNo;
  applicant1ApplyForConditionalOrderStarted: YesOrNo;
  applicant2ApplyForConditionalOrderStarted: YesOrNo;
  connections: JurisdictionConnections[];
  applicant1FullNameOnCertificate?: string;
  applicant2FullNameOnCertificate?: string;
  applicant1AddressPrivate: YesOrNo;
  applicant2FirstNames?: string;
  applicant2MiddleNames?: string;
  applicant2LastNames?: string;
  applicant2ConfirmFullName?: YesOrNo | null;
  applicant2AddressPrivate: YesOrNo;
  applicant2Address1?: string;
  applicant2Address2?: string;
  applicant2Address3?: string;
  applicant2AddressTown?: string;
  applicant2AddressCounty?: string;
  applicant2AddressPostcode?: string;
  applicant2AddressCountry?: string;
  applicant2AddressOverseas?: YesOrNo;
  applicant1LastNameChangedWhenMarried?: YesOrNo;
  applicant1LastNameChangedWhenMarriedMethod?: ChangedNameHow[];
  applicant1LastNameChangedWhenMarriedOtherDetails?: string;
  applicant1NameDifferentToMarriageCertificate?: YesOrNo;
  applicant1NameDifferentToMarriageCertificateMethod?: ChangedNameHow[];
  applicant1NameDifferentToMarriageCertificateOtherDetails?: string;
  applicant1NameChangedHow?: ChangedNameHow[];
  applicant1NameChangedHowOtherDetails?: string;
  applicant2LastNameChangedWhenMarried?: YesOrNo;
  applicant2LastNameChangedWhenMarriedMethod?: ChangedNameHow[];
  applicant2LastNameChangedWhenMarriedOtherDetails?: string;
  applicant2NameDifferentToMarriageCertificate?: YesOrNo;
  applicant2NameDifferentToMarriageCertificateMethod?: ChangedNameHow[];
  applicant2NameDifferentToMarriageCertificateOtherDetails?: string;
  applicant2NameChangedHow?: ChangedNameHow[];
  applicant2NameChangedHowOtherDetails?: string;
  applicant1Email?: string;
  applicant2Email?: string;
  applicant2EmailAddress?: string;
  applicant1DoesNotKnowApplicant2EmailAddress?: Checkbox;
  applicant1KnowsApplicant2Address?: YesOrNo;
  iWantToHavePapersServedAnotherWay?: Checkbox;
  applicant1LegalProceedings?: YesOrNo;
  applicant1LegalProceedingsDetails?: string;
  applicant2LegalProceedings?: YesOrNo;
  applicant2LegalProceedingsDetails?: string;
  applicant1ApplyForFinancialOrder?: YesOrNo;
  applicant1WhoIsFinancialOrderFor?: FinancialOrderFor[];
  applicant2ApplyForFinancialOrder?: YesOrNo;
  applicant2WhoIsFinancialOrderFor?: FinancialOrderFor[];
  applicant1UploadedFiles?: UploadedFile[];
  applicant2UploadedFiles?: UploadedFile[];
  documentsGenerated: ListValue<DivorceDocument>[];
  documentsUploaded: ListValue<DivorceDocument>[];
  applicant1DocumentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  applicant2DocumentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  applicant1CannotUpload?: Checkbox;
  applicant2CannotUpload?: Checkbox;
  applicant1CannotUploadDocuments?: DocumentType | DocumentType[];
  applicant2CannotUploadDocuments?: DocumentType | DocumentType[];
  accessCode?: string;
  dueDate?: DateAsString;
  applicant1IConfirmPrayer?: Checkbox;
  applicant2IConfirmPrayer?: Checkbox;
  applicant1StatementOfTruth?: Checkbox;
  applicant2StatementOfTruth?: Checkbox;
  caseReference?: string;
  respondentUserId?: string;
  dateSubmitted?: DateAsString;
  applicationPayments: ListValue<Payment>[];
  finalOrderPayments: ListValue<Payment>[];
  applicationFeeOrderSummary: OrderSummary;
  applicationFeeServiceRequestReference: string;
  applicant2FinalOrderFeeOrderSummary: OrderSummary;
  applicant2FinalOrderFeeServiceRequestReference: string;
  applicant2Confirmation: YesOrNo;
  applicant2Explanation: string;
  applicant1PcqId?: string;
  disputeApplication?: YesOrNo;
  confirmDisputeApplication?: YesOrNo;
  confirmReadPetition?: Checkbox;
  jurisdictionAgree?: YesOrNo;
  intendToDelay?: YesOrNo;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction?: string;
  inWhichCountryIsYourLifeMainlyBased?: string;
  alternativeServiceOutcomes: ListValue<AlternativeServiceOutcome>[];
  applicant1ApplyForConditionalOrder?: YesOrNo;
  applicant2ApplyForConditionalOrder?: YesOrNo;
  applicant1ConfirmInformationStillCorrect?: YesOrNo;
  applicant1ReasonInformationNotCorrect?: string;
  applicant2ConfirmInformationStillCorrect?: YesOrNo;
  applicant2ReasonInformationNotCorrect?: string;
  coApplicant1StatementOfTruth?: Checkbox;
  coApplicant2StatementOfTruth?: Checkbox;
  coCourt: ConditionalOrderCourt;
  dateFinalOrderEligibleFrom: DateAsString;
  coCertificateOfEntitlementDocument: DivorceDocument;
  coConditionalOrderGrantedDocument: DivorceDocument;
  coApplicant1SubmittedDate?: DateAsString;
  coApplicant2SubmittedDate?: DateAsString;
  coRefusalRejectionAdditionalInfo?: string;
  coDateAndTimeOfHearing: DateAsString;
  coDecisionDate: DateAsString;
  coGrantedDate: DateAsString;
  applicant1IsApplicant2Represented: Applicant2Represented;
  coRefusalClarificationReason?: ClarificationReason[];
  coRefusalClarificationAdditionalInfo?: string;
  dateFinalOrderEligibleToRespondent?: DateAsString;
  coClarificationResponses?: string;
  coClarificationResponsesSubmitted?: ListValue<ClarificationResponse>[];
  coCannotUploadClarificationDocuments?: Checkbox;
  coClarificationUploadDocuments?: ListValue<Partial<DivorceDocument> | null>[];
  coClarificationUploadedFiles?: UploadedFile[];
  coLegalAdvisorDecisions?: ListValue<LegalAdvisorDecision>[];
  doesApplicant1WantToApplyForFinalOrder?: Checkbox;
  doesApplicant2WantToApplyForFinalOrder?: Checkbox;
  applicant2FinalOrderExplanation?: string;
  dateFinalOrderNoLongerEligible?: DateAsString;
  applicant2SolicitorName: string;
  applicant2SolicitorEmail: string;
  applicant2SolicitorFirmName: string;
  applicant2SolicitorAddress1?: string;
  applicant2SolicitorAddress2?: string;
  applicant2SolicitorAddress3?: string;
  applicant2SolicitorAddressTown?: string;
  applicant2SolicitorAddressCounty?: string;
  applicant2SolicitorAddressPostcode?: string;
  applicant2SolicitorAddressCountry?: string;
  applicant1FinalOrderLateExplanation?: string;
  applicant2FinalOrderLateExplanation?: string;
  applicant1FinalOrderStatementOfTruth?: Checkbox;
  applicant2FinalOrderStatementOfTruth?: Checkbox;
  applicant2SolicitorRepresented: YesOrNo;
  applicant1SolicitorRepresented: YesOrNo;
  dateFinalOrderSubmitted?: DateAsString;
  applicant1IntendsToSwitchToSole?: Checkbox;
  applicant2IntendsToSwitchToSole?: Checkbox;
  dateAosSubmitted?: DateAsString;
  aosStatementOfTruth: Checkbox;
  previousState: State;
  applicant1UsedWelshTranslationOnSubmission?: YesOrNo;
  applicant2UsedWelshTranslationOnSubmission?: YesOrNo;
  applicant2Offline: YesOrNo;
  applicant1AppliedForFinalOrderFirst: YesOrNo;
  applicant2AppliedForFinalOrderFirst: YesOrNo;
  switchedToSoleCo: YesOrNo;
  coIsAdminClarificationSubmitted: YesOrNo;
  doesApplicant1IntendToSwitchToSole: YesOrNo;
  dateApplicant1DeclaredIntentionToSwitchToSoleFo: DateAsString;
  doesApplicant2IntendToSwitchToSole: YesOrNo;
  dateApplicant2DeclaredIntentionToSwitchToSoleFo: DateAsString;
  finalOrderSwitchedToSole: YesOrNo;
  applicant1CanIntendToSwitchToSoleFo: YesOrNo;
  applicant2CanIntendToSwitchToSoleFo: YesOrNo;
  isFinalOrderOverdue: YesOrNo;
  requestsForInformation?: ListValue<Partial<RequestForInformation> | null>[];
  requestForInformation?: RequestForInformation;
  app1RfiDraftResponseDocs?: ListValue<Partial<DivorceDocument> | null>[];
  app1RfiDraftResponseUploadedFiles?: UploadedFile[];
  app1RfiDraftResponseCannotUploadDocs?: Checkbox;
  app1RfiDraftResponseDetails?: string;
  app2RfiDraftResponseDocs?: ListValue<Partial<DivorceDocument> | null>[];
  app2RfiDraftResponseUploadedFiles?: UploadedFile[];
  app2RfiDraftResponseCannotUploadDocs?: Checkbox;
  app2RfiDraftResponseDetails?: string;
  citizenPaymentCallbackUrl: string;
}

export interface CaseWithId extends Case {
  id: string;
  state: State;
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

export interface UploadedFile {
  id: string;
  name: string;
}
