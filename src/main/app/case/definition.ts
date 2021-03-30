/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.30.840 on 2021-03-30 14:44:06.

export interface Address {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  PostTown: string;
  County: string;
  PostCode: string;
  Country: string;
}

export interface CaseLink {
  CaseReference: string;
}

export interface Document {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export interface DynamicElementIndicator {}

export interface DynamicList {
  value: DynamicListElement;
  valueCode: string;
  valueLabel: string;
  list_items: DynamicListElement[];
}

export interface DynamicListElement {
  code: string;
  label: string;
}

export interface Fee {
  FeeAmount: string;
  FeeCode: string;
  FeeDescription: string;
  FeeVersion: string;
}

export interface ListValue<T> {
  id: string;
  value: T;
}

export interface OrderSummary {
  PaymentReference: string;
  Fees: ListValue<Fee>[];
  PaymentTotal: string;
}

export interface CaseData {
  petitionerContactDetailsConfidential: ConfidentialAddress;
  divorceOrDissolution: DivorceOrDissolution;
  D8ScreenHasMarriageBroken: YesOrNo;
  D8MarriageIsSameSexCouple: YesOrNo;
  D8InferredPetitionerGender: Gender;
  D8InferredRespondentGender: Gender;
  D8MarriageDate: string;
  D8HelpWithFeesReferenceNumber: string;
  D8HelpWithFeesNeedHelp: YesOrNo;
  D8ScreenHasMarriageCert: YesOrNo;
  D8HelpWithFeesAppliedForFees: YesOrNo;
  D8MarriedInUk: YesOrNo;
  D8CertificateInEnglish: YesOrNo;
  D8CertifiedTranslation: YesOrNo;
  D8CountryName: string;
  D8MarriagePlaceOfMarriage: string;
  D8PetitionerFirstName: string;
  D8PetitionerLastName: string;
  D8PetitionerEmail: string;
  PetitionerAgreedToReceiveEmails: YesOrNo;
  JurisdictionPetitionerResidence: YesOrNo;
  JurisdictionRespondentResidence: YesOrNo;
  JurisdictionPetitionerDomicile: YesOrNo;
  JurisdictionRespondentDomicile: YesOrNo;
  JurisdictionPetHabituallyResLastTwelveMonths: YesOrNo;
  JurisdictionPetHabituallyResLastSixMonths: YesOrNo;
  JurisdictionResidualEligible: YesOrNo;
  JurisdictionBothLastHabituallyResident: YesOrNo;
  LanguagePreferenceWelsh: YesOrNo;
  D8PetitionerNameDifferentToMarriageCert: YesOrNo;
  D8PetitionerNameChangedHow: ChangedNameHow;
  D8PetitionerNameChangedHowOtherDetails: string;
  D8DivorceWho: WhoDivorcing;
  D8DerivedPetitionerHomeAddress: string;
  D8PetitionerPhoneNumber: string;
  D8RespondentFirstName: string;
  D8RespondentLastName: string;
  D8RespondentNameAsOnMarriageCertificate: YesOrNo;
  RespNameDifferentToMarriageCertExplain: string;
  PetitionerSolicitorName: string;
  D8SolicitorReference: string;
  PetitionerSolicitorPhone: string;
  PetitionerSolicitorEmail: string;
  SolicitorAgreeToReceiveEmails: YesOrNo;
  DerivedPetitionerSolicitorAddr: string;
  PetitionerOrganisationPolicy: string;
  D8MarriagePetitionerName: string;
  D8MarriageRespondentName: string;
  SolUrgentCase: YesOrNo;
  SolUrgentCaseSupportingInformation: string;
  D8DivorceCostsClaim: YesOrNo;
  D8FinancialOrder: YesOrNo;
  SolServiceMethod: SolServiceMethod;
  SolStatementOfReconciliationCertify: YesOrNo;
  SolStatementOfReconciliationDiscussed: YesOrNo;
  D8StatementOfTruth: YesOrNo;
  SolSignStatementOfTruth: YesOrNo;
  SolStatementOfReconciliationName: string;
  SolStatementOfReconciliationFirm: string;
  StatementOfReconciliationComments: string;
  SolApplicationFeeInPounds: string;
  SolPaymentHowToPay: SolToPay;
  PbaNumbers: DynamicList;
  FeeAccountReference: string;
  SolApplicationFeeOrderSummary: OrderSummary;
  LastNameChangedWhenMarried: YesOrNo;
  JurisdictionConnections: JurisdictionConnections[];
}

export const enum FieldType {
  Unspecified = 'Unspecified',
  Email = 'Email',
  PhoneUK = 'PhoneUK',
  Date = 'Date',
  Document = 'Document',
  Schedule = 'Schedule',
  TextArea = 'TextArea',
  FixedList = 'FixedList',
  FixedRadioList = 'FixedRadioList',
  YesOrNo = 'YesOrNo',
  Address = 'Address',
  CaseLink = 'CaseLink',
  OrderSummary = 'OrderSummary',
  MultiSelectList = 'MultiSelectList',
}

export const enum YesOrNo {
  YES = 'YES',
  NO = 'NO',
}

export const enum State {
  Draft = 'Draft',
  SOTAgreementPayAndSubmitRequired = 'SOTAgreementPayAndSubmitRequired',
  Submitted = 'Submitted',
  SolicitorAwaitingPaymentConfirmation = 'SolicitorAwaitingPaymentConfirmation',
}

export const enum UserRole {
  CASEWORKER_DIVORCE_COURTADMIN_BETA = 'CASEWORKER_DIVORCE_COURTADMIN_BETA',
  CASEWORKER_DIVORCE_COURTADMIN = 'CASEWORKER_DIVORCE_COURTADMIN',
  CITIZEN = 'CITIZEN',
  CASEWORKER_DIVORCE_SOLICITOR = 'CASEWORKER_DIVORCE_SOLICITOR',
  CASEWORKER_DIVORCE_SUPERUSER = 'CASEWORKER_DIVORCE_SUPERUSER',
  CASEWORKER_DIVORCE_COURTADMIN_LA = 'CASEWORKER_DIVORCE_COURTADMIN_LA',
  CASEWORKER_DIVORCE_SYSTEMUPDATE = 'CASEWORKER_DIVORCE_SYSTEMUPDATE',
}

export const enum ConfidentialAddress {
  SHARE = 'share',
  KEEP = 'keep',
}

export const enum DivorceOrDissolution {
  DIVORCE = 'divorce',
  DISSOLUTION = 'dissolution',
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_GIVEN = 'notGiven',
}

export const enum ChangedNameHow {
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  DEED_POLL = 'deedPoll',
  OTHER = 'other',
}

export const enum WhoDivorcing {
  HUSBAND = 'husband',
  WIFE = 'wife',
}

export const enum SolServiceMethod {
  PERSONAL_SERVICE = 'personalService',
  COURT_SERVICE = 'courtService',
}

export const enum SolToPay {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEES_HELP_WITH = 'feesHelpWith',
}

/**
 * Values:
 * - `A` - The Petitioner and Respondent are habitually resident
 * - `B` - The Petitioner and Respondent were last habitually resident in England and Wales
 * - `C` - The Respondent habitually resides in England and Wales
 * - `D` - The Petitioner is habitually resident in England and Wales and has been for 12 months
 * - `E` - The Petitioner is habitually resident in England and Wales and has been for 6 months
 * - `F` - The Petitioner and Respondent are both domiciled in England and Wales
 * - `G` - Eligible for Residual Jurisdiction
 */
export const enum JurisdictionConnections {
  /**
   * The Petitioner and Respondent are habitually resident
   */
  PET_RESP_RESIDENT = 'A',
  /**
   * The Petitioner and Respondent were last habitually resident in England and Wales
   */
  PET_RESP_LAST_RESIDENT = 'B',
  /**
   * The Respondent habitually resides in England and Wales
   */
  RESP_RESIDENT = 'C',
  /**
   * The Petitioner is habitually resident in England and Wales and has been for 12 months
   */
  PET_RESIDENT_TWELVE_MONTHS = 'D',
  /**
   * The Petitioner is habitually resident in England and Wales and has been for 6 months
   */
  PET_RESIDENT_SIX_MONTHS = 'E',
  /**
   * The Petitioner and Respondent are both domiciled in England and Wales
   */
  PET_RESP_DOMICILED = 'F',
  /**
   * Eligible for Residual Jurisdiction
   */
  RESIDUAL_JURISDICTION = 'G',
}
export const D_8_PETITIONER_FIRST_NAME = 'D8PetitionerFirstName';
export const D_8_PETITIONER_LAST_NAME = 'D8PetitionerLastName';
export const D_8_PETITIONER_EMAIL = 'D8PetitionerEmail';
export const FIRSTNAME = 'FirstName';
export const LASTNAME = 'LastName';
export const EMAIL = 'Email';
export const SAVE_AND_CLOSE = 'save-and-close';
export const SOLICITOR_CREATE = 'solicitor-create';
export const SOLICITOR_STATEMENT_OF_TRUTH_PAY_SUBMIT = 'solicitor-statement-of-truth-pay-submit';
export const SUBMIT_PETITION = 'submit-petition';
export const SOLICITOR_UPDATE = 'solicitor-update';
export const CREATE_DRAFT = 'create-draft';
export const PATCH_CASE = 'patch-case';
export const CASE_TYPE = 'NO_FAULT_DIVORCE4';
export const JURISDICTION = 'DIVORCE';
